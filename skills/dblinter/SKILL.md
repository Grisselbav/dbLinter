---
name: dblinter
description: Run dbLinter (a static code analysis and SQL-based testing tool for Oracle and PostgreSQL SQL/PL/SQL code) via its CLI, then parse and act on the results. Use this skill whenever the user asks to "lint", "check", "analyse", or "test" SQL/PL/SQL code with dbLinter, mentions the `dblinter` command, references files like `dblinter.sarif.sarif` / `dblinter.sonarqube.json` / `dblinter.junit.xml`, asks to find issues in PL/SQL packages/procedures/functions/views/tables, or wants to interpret or fix issues reported by a previous dbLinter run. Also trigger when the user mentions environment variables prefixed with `DBLINTER_` (e.g. `DBLINTER_TENANT_NAME`, `DBLINTER_ACCESS_TOKEN`, `DBLINTER_CONFIG_NAME`).
---

# dbLinter

dbLinter is a static analysis and SQL-based testing tool for Oracle Database and PostgreSQL SQL/PL/SQL code, from Grisselbav / United Codes. It is run via the `dblinter` CLI and produces machine-readable reports in several formats (SARIF, SonarQube, Checkstyle, JUnit, GitHub Actions, GitLab, VS Code Markdown). Documentation: <https://grisselbav.github.io/dbLinter/tools/cli/cli-overview/>.

## What this skill helps with

The skill covers three things, in this order:

1. **Picking the right `dblinter` invocation** for the user's task — `check` (static analysis) vs `test` (SQL-based tests), choosing output formats, and tuning `--parallel`.
2. **Running the command** in the user's working directory.
3. **Parsing the resulting reports** (especially SARIF and SonarQube JSON) to summarise issues, group by rule/severity, or guide fixes in the SQL/PL/SQL source files.

If the user only asks for one of these (e.g. "just give me the command"), do that and stop.

## Authentication and environment

dbLinter requires authentication against a tenant. The user has set these as environment variables and you should rely on them — **do not pass `--tenantName`, `--userName`, `--accessToken`, `--configName`, or `--repoUrl` on the command line unless the user explicitly provides a different value**:

- `DBLINTER_REPO_URL` — optional; only set when targeting a non-production / dev API. Omit when working against production.
- `DBLINTER_TENANT_NAME` — tenant for authentication.
- `DBLINTER_USER_NAME` — user email for authentication.
- `DBLINTER_ACCESS_TOKEN` — personal access token.
- `DBLINTER_CONFIG_NAME` — name of the configuration (defines included files, enabled rules, JDBC connection, etc.).

You generally never need to read or echo these values. If a `dblinter` run fails with an authentication error, mention which variable is likely missing or wrong rather than asking the user to paste secrets.

## Commands

### `dblinter check` — static code analysis

Runs the configured rules over SQL/PL/SQL files in the workspace. No database connection is strictly required (though the configured one will be used if available, for better results).

Output formats (comma-separated via `--outputFormats`, default = all):

- `sarif` → `dblinter.sarif.sarif` (JSON, industry-standard, **best choice for Claude to parse**)
- `sonarqube` → `dblinter.sonarqube.json` (Generic Issue Import format, also easy to parse)
- `checkstyle` → `dblinter.checkstyle.xml`
- `github` → annotations printed to stdout (for GitHub Actions)
- `gitlab` → `dblinter.gitlab.json` (Code Quality format)
- `vscode` → `dblinter.vscode.md` (human-readable Markdown)

### `dblinter test` — SQL-based tests

Runs SQL-based tests against the live database. **Requires a working JDBC connection** — either configured in the Web GUI for the chosen `configName`, or passed via `--connJdbcUrl`, `--connUserName`, `--connPassword`.

Output formats (default = all):

- `junit` → `dblinter.junit.xml`
- `vscode` → `dblinter.vscode.md`

### Other arguments worth knowing

- `--outputName=<name>` — base name of output files (default `dblinter`). E.g. `--outputName=mycheck` produces `mycheck.sarif.sarif`, `mycheck.sonarqube.json`, etc.
- `--parallel=<n>` — files (for `check`) or tests (for `test`) processed in parallel; default `1`. Higher values are faster on machines with spare cores and RAM. For large codebases on CI, `--parallel=4` or `8` is reasonable.
- `--workspace=<dir>` — working directory; default is the current directory.
- `--options=<file>` — load options from a `dblinter.properties` file.
- `--logLevel=<level>` — `off|error|warning|info|debug|trace`; default `info`.

## Choosing the right invocation

When the user asks something like "lint my SQL" or "run dbLinter":

1. **Default to `check`** unless the user explicitly mentions tests, assertions, or a database connection.
2. **Default output formats**: if the user wants a quick summary or wants you to analyse the results, run with `--outputFormats=sarif` so you have one structured file to read. If they want the full set (e.g. for CI), omit `--outputFormats` so all formats are produced.
3. **Default `--parallel`**: leave it unset (=`1`) for small ad-hoc runs. For large workspaces (hundreds of files) suggest `--parallel=4`.
4. **Run from the right directory**. The user's SQL files must be in (or under) the working directory. If the user invokes you from a directory that doesn't look like a SQL project, ask before running.

### Examples

Quick check, parsable output only:

```bash
dblinter check --outputFormats=sarif --parallel=4
```

Full set of reports for a CI pipeline:

```bash
dblinter check --parallel=8
```

SQL-based tests, JUnit only:

```bash
dblinter test --outputFormats=junit --parallel=4
```

Both, into a named subfolder of reports:

```bash
mkdir -p reports
dblinter check --outputFormats=sarif --outputName=reports/check
dblinter test  --outputFormats=junit --outputName=reports/test
```

The simplest forms also work and use sensible defaults:

```bash
dblinter check
dblinter test
```

## Running the command

Use `bash_tool` (or whichever shell tool is available) from the user's working directory. The CLI must already be on the `PATH` — if `dblinter: command not found`, point the user to the install instructions at <https://grisselbav.github.io/dbLinter/tools/cli/cli-overview/#installation>; do not try to install it for them.

A few practical notes:

- `dblinter check` can take a while on large codebases. Stream output rather than buffering silently.
- The CLI exits with a non-zero status when issues exist (so `set -e` scripts will halt). When running it yourself, treat a non-zero exit as **expected** if the report files were produced — that is the linter doing its job, not a tool failure. Read the report before deciding.
- The CLI produces files like `dblinter.sarif.sarif` (yes, the extension is doubled — `.sarif` base name + `.sarif` format suffix). Don't rename this expecting the tool to follow; that is the actual filename.

## Parsing the output

After a successful run, the user usually wants you to do something with the results. See `references/parsing-output.md` for concrete schemas and parsing recipes for SARIF and SonarQube JSON, and for how to map issues back to source lines so you can propose fixes.

A short version of the parsing decision:

- If `dblinter.sarif.sarif` exists → parse it. Each `runs[*].results[*]` entry has the rule id, message, severity, file path, and a region (start/end line+column). This is the most useful format for grouping issues, summarising, or driving fixes.
- Else if `dblinter.sonarqube.json` exists → parse that; it has a flatter `issues[]` array.
- Else if only `dblinter.vscode.md` exists → read it as text and extract what the user asked for; do not try to JSON-parse it.

For `test` runs, parse `dblinter.junit.xml` similarly — failed `<testcase>` elements contain `<failure>` children with the message.

## Acting on issues

When the user asks you to **fix** the issues dbLinter found:

1. Parse the report and group issues by file.
2. For each file with issues, read the source, locate the regions referenced by the report, and propose fixes consistent with the rule message. dbLinter rule ids (e.g. `Core-G-1050`) map to documented best practices — when uncertain, quote the rule message rather than guessing.
3. Apply changes one file at a time. To verify the fix, **re-run `dblinter check` on the whole workspace** — the CLI processes whatever SQL files match the configured include/exclude patterns under the workspace and does not currently accept individual file arguments. For tight loops on a single file, copy that file (and only that file) into a scratch directory and run `dblinter check --workspace=<scratch-dir>`; just be aware that rules depending on cross-file context may produce different results in isolation.
4. Never silently disable rules or add suppressions to make issues go away; if a rule genuinely doesn't apply, surface that to the user and let them decide.

## Pitfalls

- **Don't echo secrets.** `DBLINTER_ACCESS_TOKEN` is a credential. Don't `echo $DBLINTER_ACCESS_TOKEN`, don't print the env, don't include it in any command you suggest the user paste.
- **Don't override env-supplied auth on the CLI** unless the user asked. Mixing `--tenantName=...` with the env var can mask bugs.
- **`test` needs DB access.** If `dblinter test` errors out about a connection, check that the configured JDBC URL/user/password are correct, or pass them explicitly via `--connJdbcUrl`, `--connUserName`, `--connPassword`.
- **The double `.sarif.sarif` extension is intentional.** Don't rename outputs in scripts based on assumptions.
- **`check` and `test` are licensed features** (Essential or Professional subscription). A 401/403 from the API likely means the configured tenant lacks the right subscription — surface that rather than retrying.
