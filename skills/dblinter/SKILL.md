---
name: dblinter
description: Run the dbLinter CLI (`dblinter`) to lint, test, or format Oracle code (SQL, PL/SQL, SQL*Plus, SQLcl, APEXlang) and PostgreSQL code (SQL, PL/pgSQL, psql), including SQL in Markdown and notebooks, then act on the results. Use whenever the user asks to lint, check, analyse, or test such code with dbLinter; to format, beautify, or reformat SQL/PL/SQL, optionally with style wishes like "leading commas" or "uppercase keywords"; to check only some files or only new/changed code; to interpret or fix issues from reports like `dblinter.sarif.sarif`, `dblinter.sonarqube.json`, or `dblinter.junit.xml`; to verify the CLI install or version; or mentions `DBLINTER_*` environment variables.
license: Apache-2.0
---

# dbLinter

dbLinter is a static analysis and SQL-based testing tool for Oracle Database code (SQL, PL/SQL, SQL*Plus, SQLcl, APEXlang) and PostgreSQL code (SQL, PL/pgSQL, psql), including SQL in Markdown code blocks and SQL notebooks, from Grisselbav / United Codes. It is run via the `dblinter` CLI and produces machine-readable reports in several formats (SARIF, SonarQube, Checkstyle, JUnit, GitHub Actions, GitLab, VS Code Markdown). Its `format` command also formats SQL and PL/SQL code in place. Documentation: <https://grisselbav.github.io/dbLinter/tools/cli/cli-overview/>.

## What this skill helps with

The skill covers four things, in this order:

1. **Picking the right `dblinter` invocation** for the user's task — `check` (static analysis) vs `test` (SQL-based tests) vs `format` (in-place code formatting) vs `version` (installation/version check), choosing output formats or formatter options, scoping `check`/`format` to specific files/directories or to new/changed code only, and tuning `--parallel`.
2. **Running the command** in the user's working directory.
3. **Parsing the resulting reports** (especially SARIF and SonarQube JSON) to summarise issues, group by rule/severity, or guide fixes in the source files — or, for `format`, summarising which files changed.
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
   git diff --name-only --diff-filter=ACMR --relative <branch>
   ```
   `--diff-filter=ACMR` excludes deleted files (nothing for dblinter to check in a file that no longer exists). **Always include `--relative`**: `git diff --name-only` prints paths relative to the repo root, but `dblinter` resolves `<paths...>` relative to the current working directory. Without `--relative`, running the command from any directory other than the repo root (e.g. a `database/` subdirectory) produces paths like `database/src/main/install.sql` that don't exist relative to that subdirectory — dblinter silently finds nothing to check. `--relative` rewrites the list to `src/main/install.sql` instead, matching `dblinter`'s own default working directory (see `--workspace` above). This also correctly narrows the list to files under the current directory when the repo has changes elsewhere that aren't part of this workspace.
5. If that list is empty, there's nothing new to check — say so and skip running `check` at all. Running it anyway with no `<paths...>` would silently fall back to analysing the whole workspace, which answers a different question than "what's new".

```bash
# comparing against the local main branch
dblinter check --outputFormats=sarif --newCodeOnly=true --referenceBranch=main \
  $(git diff --name-only --diff-filter=ACMR --relative main)

# comparing against origin/main specifically (fetch first if it isn't already resolvable locally)
git fetch origin main
dblinter check --outputFormats=sarif --newCodeOnly=true --referenceBranch=origin/main \
  $(git diff --name-only --diff-filter=ACMR --relative origin/main)
```

Combining `--newCodeOnly` with `<paths...>` doesn't lose correctness: it still only reports issues on lines that actually changed within each file, so pre-existing issues elsewhere in a partially-modified file stay suppressed.

### `dblinter test` — SQL-based tests

Runs SQL-based tests against the live database. **Requires a working JDBC connection** — either configured in the Web GUI for the chosen `configName`, or passed via `--connJdbcUrl`, `--connUserName`, `--connPassword`.

Output formats (default = all):

- `junit` → `dblinter.junit.xml`
- `vscode` → `dblinter.vscode.md`

`test` does not accept `<paths...>` — it runs the SQL-based tests defined by the configuration, not an ad-hoc subset of files. To narrow scope, adjust the configuration's included tests in the Web GUI, or use `--outputName`/`--parallel` as below.

### `dblinter format` — in-place code formatting

Formats SQL and PL/SQL code using the formatter options. Documentation: <https://grisselbav.github.io/dbLinter/tools/cli/format/>.

Available since dbLinter 1.14.0. On older versions, `format` fails with `Unknown command format.`, or with `Unknown option <name>.` when a formatter option is passed (options are validated before the command). In either case nothing is formatted. Run `dblinter version` and, if it's below 1.14.0, tell the user to upgrade instead of changing the options.

Syntax: `dblinter [<options>] format [--parallel=<n>] [--<formatterOption>=<value>...] [<paths...>]`

What the command does:

- **Overwrites files in place, without backups.** Character set, byte order mark, and line separator are preserved.
- Selects files like `check` does: the configuration's include/exclude glob patterns, optionally narrowed by `<paths...>` (which must come last). Scoping works exactly as described for `check` above, including the `git diff --name-only --diff-filter=ACMR --relative <branch>` recipe for "format my changes" — there's just no `--newCodeOnly` flag, so whole files are formatted.
- Files that can't be formatted (e.g. syntax errors) are left unchanged. The reason goes to the log file only, and **no log file is written unless `--logFile` is given** — so always pass `--logFile=dblinter.format.log`.
- Produces no report files; `--outputFormats` and `--outputName` don't apply. The console prints one `Processed <file> (i/n) in <t> sec.` line per file, with `Formatted.` appended when the file changed, and ends with `Formatted X of Y files in T sec.`
- Exit code `1` if a formatted file couldn't be written (also printed to stderr), if the options are invalid, or if the language server reports an error (e.g. authentication or configuration); `0` otherwise. Unlike `check`, a non-zero exit here is always a real failure.

#### Formatter options: defaults unless the user asks otherwise

**When the user just says "format", pass no formatter options.** dbLinter then resolves each option from the first source that sets it (see "Where option values come from" below), ending with the built-in defaults. A team's shared settings usually live in a `dblinter.properties` file in the workspace, which is loaded automatically. Never add default values explicitly; that would override those shared settings.

When the user adds style wishes — "format with leading commas", "uppercase keywords and 2-space indent" — translate each wish into a `--<option>=<value>` flag and pass only those. **Read `references/formatting.md`** for the full option list, valid values and ranges, typical phrases for each option, and the options that the default `LIGHTWEIGHT` strategy ignores. Tell the user which flags their phrases became, and ask rather than guess when a phrase is ambiguous or doesn't match any option.

A command-line flag always wins over the same option in a properties file or an environment variable, and it applies to this run only. If `dblinter.properties` (or a file named by `--options`/`DBLINTER_OPTIONS`) sets an option the user overrides, mention that the run deviates from the shared settings, so they can decide whether to change the file instead.

Option names are case-sensitive (`--leadingComma`, not `--leadingcomma`); values are not. The CLI validates all options before touching any file. It stops with `Unknown option <name>.` or `Invalid value '<value>' for option <name>. Valid values are: …`, so if a flag you derived is rejected, nothing was formatted. If the rejected name is spelled exactly as in `references/formatting.md`, the CLI is probably older than 1.14.0 (see above). Otherwise, fix the flag or ask the user.

#### Before formatting: protect uncommitted work

Because files are overwritten without backups, run a preflight check first:

1. `git rev-parse --is-inside-work-tree` — if the workspace isn't a Git repository, **ask before formatting**; the user would have no way to review or undo the changes.
2. `git status --porcelain -- <paths...>` (or for the whole workspace, `git status --porcelain -- .`) — if files in scope have uncommitted changes, **ask before formatting**: the formatter's changes would be mixed with the user's own edits in the same diff. Suggest committing or stashing first.
3. Otherwise (clean Git workspace), go ahead without asking.

#### After formatting

Report the `Formatted X of Y files in T sec.` summary, the formatter flags used (or "default settings"), and `git diff --stat` for the scope. A file without `Formatted.` was either already formatted or couldn't be formatted. The console doesn't say which, so check `dblinter.format.log` for errors and warnings and list any files that failed, with the reason. Don't run `check` automatically afterwards; offer it if the user is likely to want it.

### `dblinter version` — installation / version check

Prints the installed CLI version, e.g. `dbLinter version 1.10.0`, and nothing else. Takes no arguments and needs no authentication or environment variables. Use it to confirm `dblinter` is installed and on the `PATH` before attempting `check`, `test`, or `format` (see "Checking the CLI is installed" above), or when the user simply asks which version they have.

### Other arguments worth knowing

These apply to `check` and `test`, and except for `--outputName` also to `format` (see the [Options reference](https://grisselbav.github.io/dbLinter/tools/cli/options/) for the full list):

- `--outputName=<name>` — base name of output files (default `dblinter`). E.g. `--outputName=mycheck` produces `mycheck.sarif.sarif`, `mycheck.sonarqube.json`, etc.
- `--parallel=<n>` — files (for `check` and `format`) or tests (for `test`) processed in parallel; default `1`. Higher values are faster on machines with spare cores and RAM. For large codebases on CI, `--parallel=4` or `8` is reasonable.
- `--workspace=<dir>` — absolute path to the working directory; default is the current directory.
- `--options=<file>` — load options and command arguments from a Java properties file. A `dblinter.properties` file in the workspace is loaded automatically, even without `--options`.

#### Where option values come from

For every option, the first source that sets it wins:

1. Command-line flags (`--name=value`).
2. The properties file given by `--options=<file>`.
3. `dblinter.properties` in the workspace.
4. The properties file named by the `DBLINTER_OPTIONS` environment variable.
5. `DBLINTER_*` environment variables (camelCase becomes upper snake case, e.g. `tabSize` → `DBLINTER_TAB_SIZE`).
6. Built-in defaults.

So properties files override environment variables, and command-line flags override both. This matters when a run behaves differently from what the environment variables suggest. Check for a `dblinter.properties` in the workspace before blaming the env vars.
- `--logLevel=<level>` — `off|error|warning|info|debug|trace`; default `info`.
- `--logFile=<file>` — log file path relative to the working directory (its directory must exist); no log file is written by default.
- `--connJdbcUrl`, `--connUserName`, `--connPassword` — JDBC connection for read-only database access; mandatory for `test` unless already configured in the Web GUI for the chosen `configName`, optional for `check` (used opportunistically for better results when available).

## Choosing the right invocation

When the user asks something like "lint my SQL" or "run dbLinter":

1. **Default to `check`** unless the user explicitly mentions tests, assertions, or a database connection. Use `format` only when the user asks to format, beautify, reformat, or restyle code; never format as a side effect of a lint request, because it rewrites files.
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
  $(git diff --name-only --diff-filter=ACMR --relative main)
```

Same, but explicitly against `origin/main` (the remote-tracking ref, not the local branch — see
"Which branch reference to use" above for when each is appropriate):

```bash
git fetch origin main   # only if origin/main isn't already resolvable locally
dblinter check --outputFormats=sarif --newCodeOnly=true --referenceBranch=origin/main \
  $(git diff --name-only --diff-filter=ACMR --relative origin/main)
```

Full set of reports for a CI pipeline:

```bash
dblinter check --parallel=8
```

SQL-based tests, JUnit only:

```bash
dblinter test --outputFormats=junit --parallel=4
```

Format the whole workspace with the configured/default formatter settings:

```bash
dblinter format --logFile=dblinter.format.log
```

Format "with leading commas and uppercase keywords":

```bash
dblinter format --logFile=dblinter.format.log --leadingComma=true --keywordCase=upper
```

Format only the files changed relative to the local `main` branch:

```bash
dblinter format --logFile=dblinter.format.log \
  $(git diff --name-only --diff-filter=ACMR --relative main)
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
dblinter format
dblinter version
```

## Running the command

Use `bash_tool` (or whichever shell tool is available) from the user's working directory. The CLI must already be on the `PATH` — if `dblinter: command not found`, point the user to the install instructions at <https://grisselbav.github.io/dbLinter/tools/cli/cli-overview/#installation>; do not try to install it for them.

A few practical notes:

- `dblinter check` can take a while on large codebases. Stream output rather than buffering silently.
- `check` and `test` exit with a non-zero status when issues exist (so `set -e` scripts will halt). When running it yourself, treat a non-zero exit as **expected** if the report files were produced — that is the linter doing its job, not a tool failure. Read the report before deciding. `format` is different: exit code `1` means a formatted file couldn't be written, which is a real failure.
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
- **Always pass `--relative` to the `git diff --name-only` used for `<paths...>`.** Without it, paths are repo-root-relative, but dblinter resolves `<paths...>` relative to the current working directory — running the documented command from any subdirectory of the repo then silently finds no files to check (the paths just don't exist there). If a `--newCodeOnly` run reports zero issues unexpectedly, check whether it was run from a subdirectory without `--relative`.
- **`--newCodeOnly=true` by itself does not limit the runtime.** It only filters which *issues* are reported, not which *files* dblinter processes — passing it without `<paths...>` still analyses the entire configured workspace. Always pair it with the changed-file list from `git diff --name-only --diff-filter=ACMR <referenceBranch>` when the user's goal (as it usually is) is to check new code *faster*, not just to see a filtered report.
- **The double `.sarif.sarif` extension is intentional.** Don't rename outputs in scripts based on assumptions.
- **`format` overwrites files without backups.** Always run the Git preflight from the `format` section first. Don't pass default formatter values explicitly, because that overrides settings from `DBLINTER_*` variables or properties files.
- **`check`, `test`, and `format` are licensed features** (Essential or Professional subscription). A 401/403 from the API likely means the configured tenant lacks the right subscription — surface that rather than retrying.
