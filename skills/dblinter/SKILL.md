---
name: dblinter
description: Run dbLinter (a static code analysis and SQL-based testing tool for Oracle Database code — SQL, PL/SQL, SQL*Plus, SQLcl, APEXlang — and PostgreSQL code — SQL, PL/pgSQL, psql — including SQL in Markdown code blocks and SQL notebooks) via its CLI, then parse and act on the results. Use this skill whenever the user asks to "lint", "check", "analyse", or "test" SQL, PL/SQL, PL/pgSQL, APEXlang, SQL*Plus/SQLcl, or psql code with dbLinter, mentions the `dblinter` command, references files like `dblinter.sarif.sarif` / `dblinter.sonarqube.json` / `dblinter.junit.xml`, asks to find issues in PL/SQL packages/procedures/functions/views/tables, APEX pages, or SQL scripts/notebooks, or wants to interpret or fix issues reported by a previous dbLinter run. Also trigger when the user wants to check only specific files/directories or only new/changed code (`newCodeOnly`), wants to verify the `dblinter` CLI is installed or find its version, or mentions environment variables prefixed with `DBLINTER_` (e.g. `DBLINTER_TENANT_NAME`, `DBLINTER_ACCESS_TOKEN`, `DBLINTER_CONFIG_NAME`).
license: Apache-2.0
---

# dbLinter

dbLinter is a static analysis and SQL-based testing tool for Oracle Database code (SQL, PL/SQL, SQL*Plus, SQLcl, APEXlang) and PostgreSQL code (SQL, PL/pgSQL, psql), including SQL in Markdown code blocks and SQL notebooks, from Grisselbav / United Codes. It is run via the `dblinter` CLI and produces machine-readable reports in several formats (SARIF, SonarQube, Checkstyle, JUnit, GitHub Actions, GitLab, VS Code Markdown). Documentation: <https://grisselbav.github.io/dbLinter/tools/cli/cli-overview/>.

## What this skill helps with

The skill covers four things, in this order:

1. **Picking the right `dblinter` invocation** for the user's task — `check` (static analysis) vs `test` (SQL-based tests) vs `version` (installation/version check), choosing output formats, scoping `check` to specific files/directories or to new/changed code only, and tuning `--parallel`.
2. **Running the command** in the user's working directory.
3. **Parsing the resulting reports** (especially SARIF and SonarQube JSON) to summarise issues, group by rule/severity, or guide fixes in the source files.
4. **Re-checking efficiently** after fixes, by scoping the re-run to the files that changed instead of the whole workspace.

If the user only asks for one of these (e.g. "just give me the command"), do that and stop.

## Checking the CLI is installed

If you're unsure whether `dblinter` is installed/on the `PATH`, or which version, run:

```bash
dblinter version
```

This takes no options, needs no authentication or environment variables, and prints something like `dbLinter version 1.10.0`. It's the cheapest possible sanity check before attempting a `check` or `test` run — if it fails with `command not found`, don't try to install it yourself; point the user to the install instructions at <https://grisselbav.github.io/dbLinter/tools/cli/cli-overview/#installation> (Homebrew, or a downloadable ZIP; JDK 17+ required).

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

Runs the configured rules over the files in the workspace. No database connection is strictly required (though the configured one will be used if available, for better results).

Syntax: `dblinter [<options>] check [<args>] [<paths...>]`

Output formats (comma-separated via `--outputFormats`, default = all):

- `sarif` → `dblinter.sarif.sarif` (JSON, industry-standard, **best choice for Claude to parse**)
- `sonarqube` → `dblinter.sonarqube.json` (Generic Issue Import format, also easy to parse)
- `checkstyle` → `dblinter.checkstyle.xml`
- `github` → annotations printed to stdout (for GitHub Actions)
- `gitlab` → `dblinter.gitlab.json` (Code Quality format)
- `vscode` → `dblinter.vscode.md` (human-readable Markdown)

`check`-specific arguments, beyond the shared ones below:

- `<paths...>` — optional files and/or directories, given as plain positional arguments **at the end** of the command. See "Scoping `check` to specific files or directories" below.
- `--newCodeOnly=true|false` — if `true`, only issues on new/changed lines are reported. Default `false`. Requires the workspace to be a Git repository. See "Checking only new/changed code" below.
- `--referenceBranch=<branch>` — the branch `newCodeOnly` diffs against to determine new/changed lines. Default `origin/main` (dblinter's own default when the flag is omitted) — but when a user names a branch, pass exactly what they mean; see "Which branch reference to use" below before defaulting to `origin/main` yourself.

#### Scoping `check` to specific files or directories

For large workspaces, running `check` over every configured file every time is wasteful — most of the runtime is spent re-analysing files that haven't changed. Pass one or more files or directories as plain positional arguments **after** all `--option=value` flags to limit analysis to just those paths:

```bash
# check a single file
dblinter check --outputFormats=sarif examples/Core-G-1050.sql

# check a directory (and everything under it) plus one extra file
dblinter check --outputFormats=sarif src/packages/ src/views/hr_view.sql

# glob expansion is handled by the shell, not dblinter itself
dblinter check --outputFormats=sarif ./*.sql examples/Core-G-1*.sql
```

Notes:

- This is **an additional filter on top of** the workspace's configured include/exclude patterns — it can only narrow the set of files analysed, never widen it. A path outside the configured include patterns will simply yield no results for that path, not an error.
- Use this whenever the user asks to check "just this file", "the files I changed", or names specific files/directories — don't run a full-workspace check when a narrower one answers the question and is faster.
- This is also the right tool for **tight fix-and-verify loops**: after editing a file to address a reported issue, re-run `check` scoped to just that file (or the small set of files you touched) rather than the whole workspace, then read the fresh report to confirm the issue is gone. dbLinter's checks are scoped to a single file — no rule inspects or depends on other files — so the scoped result is exactly as reliable as an unscoped one; there's no need to also run a full-workspace check to confirm.

#### Checking only new/changed code

`--newCodeOnly=true` reports issues only on lines that are new or changed relative to `--referenceBranch`. **On its own it does not reduce which files get processed** — dblinter still analyses every file matched by the workspace's configured include/exclude patterns and only filters the *reported issues* down to new/changed lines afterward. For the runtime win — the whole point of a "new code" check — always combine it with `<paths...>` listing just the changed files, per the steps below.

##### Which branch reference to use

`main` and `origin/main` are **different, independently-moving refs** — a local `main` can have unpushed commits `origin/main` doesn't have, or be behind if you haven't pulled. dblinter's own default (when `--referenceBranch` is omitted) is `origin/main`, but that's not the same as what a user means by "main". **Use exactly the reference the user asked for — never silently rewrite one to the other**:

- "compare to **local** main" / "my local main" / just "**main**" → `--referenceBranch=main`.
- "compare to **origin/main**" / "the remote main" / "main on GitHub/GitLab" → `--referenceBranch=origin/main`.
- Genuinely ambiguous and unspecified → ask, or fall back to dblinter's own default (`origin/main`) and say so, rather than guessing silently.

The rest of this section uses `<branch>` as a placeholder for whichever of those the user actually meant — substitute it literally, don't default to `origin/main` yourself.

This needs Git and a resolvable reference branch:

1. Confirm the workspace is inside a Git repository (`git rev-parse --is-inside-work-tree`).
2. Confirm `<branch>` resolves locally (`git rev-parse --verify --quiet <branch>`). Only if it doesn't *and* it's meant to be a remote-tracking ref (e.g. `origin/main`) should you fetch it, e.g. `git fetch origin main`, then re-check. If the user meant the **local** `main` and it doesn't resolve, that's a real problem to report (there is no local `main` branch) — don't paper over it by fetching `origin/main` instead, that's a different ref.
3. If the reference still can't be resolved, **don't silently fall back to an unfiltered `check`** — that produces a much larger, differently-scoped report than the user asked for. Report the problem (e.g. "`referenceBranch=origin/release-2.0` doesn't exist locally or on the remote") and let the user tell you how to proceed.
4. Get the changed file list and pass it as `<paths...>` alongside `--newCodeOnly`/`--referenceBranch` — this is what actually limits the files analysed, not just the reported issues:
   ```bash
   git diff --name-only --diff-filter=ACMR <branch>
   ```
   `--diff-filter=ACMR` excludes deleted files (nothing for dblinter to check in a file that no longer exists).
5. If that list is empty, there's nothing new to check — say so and skip running `check` at all. Running it anyway with no `<paths...>` would silently fall back to analysing the whole workspace, which answers a different question than "what's new".

```bash
# comparing against the local main branch
dblinter check --outputFormats=sarif --newCodeOnly=true --referenceBranch=main \
  $(git diff --name-only --diff-filter=ACMR main)

# comparing against origin/main specifically (fetch first if it isn't already resolvable locally)
git fetch origin main
dblinter check --outputFormats=sarif --newCodeOnly=true --referenceBranch=origin/main \
  $(git diff --name-only --diff-filter=ACMR origin/main)
```

Combining `--newCodeOnly` with `<paths...>` doesn't lose correctness: it still only reports issues on lines that actually changed within each file, so pre-existing issues elsewhere in a partially-modified file stay suppressed.

### `dblinter test` — SQL-based tests

Runs SQL-based tests against the live database. **Requires a working JDBC connection** — either configured in the Web GUI for the chosen `configName`, or passed via `--connJdbcUrl`, `--connUserName`, `--connPassword`.

Output formats (default = all):

- `junit` → `dblinter.junit.xml`
- `vscode` → `dblinter.vscode.md`

`test` does not accept `<paths...>` — it runs the SQL-based tests defined by the configuration, not an ad-hoc subset of files. To narrow scope, adjust the configuration's included tests in the Web GUI, or use `--outputName`/`--parallel` as below.

### `dblinter version` — installation / version check

Prints the installed CLI version, e.g. `dbLinter version 1.10.0`, and nothing else. Takes no arguments and needs no authentication or environment variables. Use it to confirm `dblinter` is installed and on the `PATH` before attempting `check` or `test` (see "Checking the CLI is installed" above), or when the user simply asks which version they have.

### Other arguments worth knowing

These apply to both `check` and `test` (see the [Options reference](https://grisselbav.github.io/dbLinter/tools/cli/options/) for the full list):

- `--outputName=<name>` — base name of output files (default `dblinter`). E.g. `--outputName=mycheck` produces `mycheck.sarif.sarif`, `mycheck.sonarqube.json`, etc.
- `--parallel=<n>` — files (for `check`) or tests (for `test`) processed in parallel; default `1`. Higher values are faster on machines with spare cores and RAM. For large codebases on CI, `--parallel=4` or `8` is reasonable.
- `--workspace=<dir>` — absolute path to the working directory; default is the current directory.
- `--options=<file>` — load options and command arguments from a Java properties file (e.g. `dblinter.properties`).
- `--logLevel=<level>` — `off|error|warning|info|debug|trace`; default `info`.
- `--connJdbcUrl`, `--connUserName`, `--connPassword` — JDBC connection for read-only database access; mandatory for `test` unless already configured in the Web GUI for the chosen `configName`, optional for `check` (used opportunistically for better results when available).

## Choosing the right invocation

When the user asks something like "lint my SQL" or "run dbLinter":

1. **Default to `check`** unless the user explicitly mentions tests, assertions, or a database connection.
2. **Default output formats**: if the user wants a quick summary or wants you to analyse the results, run with `--outputFormats=sarif` so you have one structured file to read. If they want the full set (e.g. for CI), omit `--outputFormats` so all formats are produced.
3. **Default `--parallel`**: leave it unset (=`1`) for small ad-hoc runs. For large workspaces (hundreds of files) suggest `--parallel=4`.
4. **Scope `check` down whenever you can.** If the user names specific files/directories, or is iterating on a fix, pass those as `<paths...>` instead of checking the whole workspace — same rules, far less to process. If the user is asking about "my changes"/"the diff"/"new code", use `--newCodeOnly=true` **together with** `<paths...>` from `git diff --name-only --diff-filter=ACMR <referenceBranch>` (see the Git preflight above) — `--newCodeOnly` alone does not limit which files are analysed, only which issues are reported, so skipping the `<paths...>` part throws away the runtime benefit the user is actually asking for. Fall back to a full, unscoped `check` for a first-time run, a pre-release/CI gate, or whenever the user wants the complete picture.
5. **Run from the right directory**. The user's source files must be in (or under) the working directory. If the user invokes you from a directory that doesn't look like a database code project, ask before running.
6. **Unsure `dblinter` is installed?** Run `dblinter version` first — it's near-instant and needs no auth.

### Examples

Quick check, parsable output only:

```bash
dblinter check --outputFormats=sarif --parallel=4
```

Check only specific files/directories (fast, for large workspaces or fix-verify loops):

```bash
dblinter check --outputFormats=sarif src/packages/pkg_orders.pkb src/views/
```

Check only new/changed lines against the **local** `main` branch (scoped to the changed files, not the whole workspace):

```bash
dblinter check --outputFormats=sarif --newCodeOnly=true --referenceBranch=main \
  $(git diff --name-only --diff-filter=ACMR main)
```

Same, but explicitly against `origin/main` (the remote-tracking ref, not the local branch — see
"Which branch reference to use" above for when each is appropriate):

```bash
git fetch origin main   # only if origin/main isn't already resolvable locally
dblinter check --outputFormats=sarif --newCodeOnly=true --referenceBranch=origin/main \
  $(git diff --name-only --diff-filter=ACMR origin/main)
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
dblinter version
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
2. For each file with issues, read the source, locate the regions referenced by the report, and propose fixes consistent with the rule message. dbLinter rule ids (e.g. `Core-G-1050`) map to documented good practices — when uncertain, quote the rule message rather than guessing.
3. Apply changes one file at a time. To verify each fix, **re-run `check` scoped to just the file(s) you changed** — pass them as `<paths...>` (e.g. `dblinter check --outputFormats=sarif path/to/fixed_file.sql`) rather than re-checking the whole workspace; it's the same rule set, applied faster. dbLinter's checks are scoped to a single file — no rule inspects or depends on other files — so there's no need to re-check the entire workspace afterward.
4. Never silently disable rules or add suppressions to make issues go away; if a rule genuinely doesn't apply, surface that to the user and let them decide.

## Pitfalls

- **Don't echo secrets.** `DBLINTER_ACCESS_TOKEN` is a credential. Don't `echo $DBLINTER_ACCESS_TOKEN`, don't print the env, don't include it in any command you suggest the user paste.
- **Don't override env-supplied auth on the CLI** unless the user asked. Mixing `--tenantName=...` with the env var can mask bugs.
- **`test` needs DB access.** If `dblinter test` errors out about a connection, check that the configured JDBC URL/user/password are correct, or pass them explicitly via `--connJdbcUrl`, `--connUserName`, `--connPassword`.
- **`<paths...>` only narrows, never widens, `check`'s scope.** A file outside the workspace's configured include/exclude patterns won't be analysed just because you named it — it will silently produce no results for that path. If a file you expect issues for shows nothing, check the configuration before assuming it's clean.
- **Don't guess at `--newCodeOnly`'s reference branch, and don't silently swap `main` for `origin/main` (or vice versa)** — they're different refs and can point to different commits (unpushed local work, or a local branch that's behind). Pass exactly what the user asked for; if it can't be resolved, resolve it properly (e.g. `git fetch origin main` only when the user actually meant the remote ref) or ask which branch to diff against — don't silently drop `--newCodeOnly` and run an unfiltered check instead, that answers a different question than the one asked.
- **`--newCodeOnly=true` by itself does not limit the runtime.** It only filters which *issues* are reported, not which *files* dblinter processes — passing it without `<paths...>` still analyses the entire configured workspace. Always pair it with the changed-file list from `git diff --name-only --diff-filter=ACMR <referenceBranch>` when the user's goal (as it usually is) is to check new code *faster*, not just to see a filtered report.
- **The double `.sarif.sarif` extension is intentional.** Don't rename outputs in scripts based on assumptions.
- **`check` and `test` are licensed features** (Essential or Professional subscription). A 401/403 from the API likely means the configured tenant lacks the right subscription — surface that rather than retrying.
