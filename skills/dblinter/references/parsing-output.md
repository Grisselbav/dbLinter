# Parsing dbLinter output

This file describes the structure of dbLinter's machine-readable reports and gives concrete recipes for extracting useful information. Read this when the user asks you to analyse, summarise, or fix issues found by a `dblinter check` or `dblinter test` run.

## SARIF (`dblinter.sarif.sarif`) — preferred for `check`

SARIF (Static Analysis Results Interchange Format) v2.1.0 — the OASIS-standard JSON schema. Reference: <https://docs.oasis-open.org/sarif/sarif/v2.1.0/errata01/os/sarif-v2.1.0-errata01-os-complete.html>.

### Structure

```jsonc
{
  "version": "2.1.0",
  "runs": [
    {
      "tool": {
        "driver": {
          "name": "dbLinter",
          "rules": [
            {
              "id": "Core-G-1050",
              "name": "Some rule name",
              "shortDescription": { "text": "..." },
              "fullDescription":  { "text": "..." },
              "helpUri": "https://..."
            }
            // ...one entry per rule that fired
          ]
        }
      },
      "results": [
        {
          "ruleId": "Core-G-1050",
          "level": "error",   // "error" | "warning" | "note"
          "message": { "text": "Human-readable description of this issue" },
          "locations": [
            {
              "physicalLocation": {
                "artifactLocation": { "uri": "examples/Core-G-1050.sql" },
                "region": {
                  "startLine": 12,
                  "startColumn": 5,
                  "endLine": 12,
                  "endColumn": 28
                }
              }
            }
          ]
        }
        // ...one entry per issue
      ]
    }
  ]
}
```

### Recipe: summarise issues by rule and severity

```python
import json, collections, pathlib

data = json.loads(pathlib.Path("dblinter.sarif.sarif").read_text())
results = data["runs"][0]["results"]

by_rule = collections.Counter(r["ruleId"] for r in results)
by_level = collections.Counter(r.get("level", "warning") for r in results)

print(f"Total issues: {len(results)}")
print("\nBy severity:")
for level, n in by_level.most_common():
    print(f"  {level:8} {n}")
print("\nTop rules:")
for rule, n in by_rule.most_common(10):
    print(f"  {rule:20} {n}")
```

### Recipe: group issues by file (useful for fixing)

```python
import json, collections, pathlib

data = json.loads(pathlib.Path("dblinter.sarif.sarif").read_text())
results = data["runs"][0]["results"]

by_file = collections.defaultdict(list)
for r in results:
    loc = r["locations"][0]["physicalLocation"]
    uri = loc["artifactLocation"]["uri"]
    region = loc.get("region", {})
    by_file[uri].append({
        "rule": r["ruleId"],
        "level": r.get("level", "warning"),
        "line": region.get("startLine"),
        "col": region.get("startColumn"),
        "message": r["message"]["text"],
    })

for uri, issues in sorted(by_file.items()):
    print(f"\n{uri} ({len(issues)} issues)")
    for i in sorted(issues, key=lambda x: (x["line"] or 0, x["col"] or 0)):
        print(f"  L{i['line']:>4}  [{i['level']}]  {i['rule']}: {i['message']}")
```

### Notes on edge cases

- `runs` is an array; in practice dbLinter writes one run, so `runs[0]` is fine. Be defensive if you ever see multiple.
- `level` is technically optional — default to `"warning"` when missing.
- A result *can* have multiple `locations`. The first location is almost always the right one to surface; mention the others only if relevant.
- `ruleId` values follow the dbLinter naming scheme (e.g. `Core-G-1050`, `Core-G-9210`). The `tool.driver.rules` array gives you the longer description for each id.

## SonarQube Generic Issue Import (`dblinter.sonarqube.json`)

A flatter format, sometimes easier than SARIF for quick scripts. Reference: <https://docs.sonarsource.com/sonarqube-server/2025.1/analyzing-source-code/importing-external-issues/generic-issue-import-format/>.

### Structure

```jsonc
{
  "issues": [
    {
      "engineId": "dbLinter",
      "ruleId": "Core-G-1050",
      "severity": "MAJOR",        // BLOCKER | CRITICAL | MAJOR | MINOR | INFO
      "type": "CODE_SMELL",       // CODE_SMELL | BUG | VULNERABILITY
      "primaryLocation": {
        "message": "Human-readable description",
        "filePath": "examples/Core-G-1050.sql",
        "textRange": {
          "startLine": 12,
          "endLine": 12,
          "startColumn": 5,
          "endColumn": 28
        }
      }
    }
  ]
}
```

### Recipe: quick summary

```python
import json, collections, pathlib

data = json.loads(pathlib.Path("dblinter.sonarqube.json").read_text())
issues = data["issues"]
by_severity = collections.Counter(i["severity"] for i in issues)
by_rule     = collections.Counter(i["ruleId"]   for i in issues)
print(f"{len(issues)} issues, {len(by_rule)} distinct rules")
for sev, n in by_severity.most_common():
    print(f"  {sev:8} {n}")
```

## JUnit XML (`dblinter.junit.xml`) — for `test`

Standard JUnit format. Reference: <https://llg.cubic.org/docs/junit/>.

### Structure (abbreviated)

```xml
<testsuites>
  <testsuite name="dbLinter" tests="131" failures="103" errors="0" time="2.117">
    <testcase name="Core-G-1250: Try to define a business key for each table." time="0.442">
      <failure message="..."> <!-- detail text --> </failure>
    </testcase>
    <testcase name="..." time="0.077"/>  <!-- a passing test has no children -->
    <!-- ... -->
  </testsuite>
</testsuites>
```

### Recipe: list failing tests

```python
import xml.etree.ElementTree as ET, pathlib

root = ET.fromstring(pathlib.Path("dblinter.junit.xml").read_text())
for tc in root.iter("testcase"):
    failure = tc.find("failure")
    if failure is not None:
        msg = (failure.get("message") or "").strip()
        print(f"FAIL  {tc.get('name')}\n      {msg}\n")
```

### Notes

- `errors` (in the suite header) means the test couldn't run (e.g. SQL compilation error). `failures` means it ran and the assertion didn't hold.
- A `<testcase>` with no children is a pass.

## Checkstyle XML, GitHub annotations, GitLab JSON, VS Code Markdown

These are typically end-formats consumed by other tools (CI annotations, Sonar, SonarQube, VS Code). Don't parse them yourself unless the user has explicitly asked — prefer SARIF or SonarQube JSON if either is available. The VS Code Markdown report (`dblinter.vscode.md`) is a useful human-readable summary you can show the user verbatim or extract sections from with plain text processing.

## Mapping issues back to source

To propose a fix, you need the source file and a line/column. Both SARIF and SonarQube formats give you a relative path (`uri` / `filePath`) — resolve it relative to the workspace where dbLinter ran. Typical workflow:

1. Pick one file with issues.
2. Read it with `view` (or equivalent), focusing on the line numbers reported.
3. For each issue at that location, propose a change consistent with the rule's message. The rule id (e.g. `Core-G-1050`) is documented at <https://grisselbav.github.io/dbLinter/> — if you don't know what a rule means, the `message` field is usually self-explanatory; if not, surface the rule id to the user and ask.
4. Apply changes via `str_replace` or by writing a patched file.
5. If practical, re-run `dblinter check` on that file (or a narrower workspace) to confirm.
