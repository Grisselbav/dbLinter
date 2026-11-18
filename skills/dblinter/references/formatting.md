# Formatter options for `dblinter format`

This reference lists every formatter option of `dblinter format`, its valid values and default, and the kinds of phrases users typically use to ask for a non-default value. Full documentation with before/after examples for each option: <https://grisselbav.github.io/dbLinter/tools/cli/format/#formatter-options>.

## Contents

- How to translate a user's wishes into options
- Styles
- Case and size
- Indentation and whitespace
- Line breaks within statements
- Spacing
- Alignment
- Strategy interactions (options that are ignored)

## How to translate a user's wishes into options

1. **Pass only what the user asked for.** Every option left out keeps its value from the first source that sets it: an `--options` properties file, `dblinter.properties` in the workspace, the file named by `DBLINTER_OPTIONS`, a `DBLINTER_*` environment variable, or the built-in default (see "Where option values come from" in `SKILL.md`). A flag on the command line beats all of these. Never spell out defaults "for clarity" — that silently overrides a team's shared settings.
2. **Map meaning, not exact wording.** "with leading commas", "commas first", and "comma at the start of the line" all mean `--leadingComma=true`. Use the tables below; the phrases listed there are examples, not an exhaustive list.
3. **Several wishes → several options.** "uppercase keywords, 2-space indent, leading commas" → `--keywordCase=upper --tabSize=2 --leadingComma=true`.
4. **Ask instead of guessing** when a phrase could mean more than one option (e.g. "uppercase" — keywords, identifiers, or both?), names a value outside the valid range (e.g. "line length 30" — `maxLineSize` starts at 40), or matches no option at all. Say which options came closest.
5. **Warn about ignored options.** If the user asks for an option that the effective `formattingStrategy` ignores (see the last section), say so and offer to add the strategy that makes it take effect — don't silently run a format that won't change what they asked for.
6. **Option names are case-sensitive; values are not.** Write the name exactly as in the tables below (`--leadingComma`). `--keywordCase=upper` and `--keywordCase=UPPER` are equivalent. Boolean options take `true`/`false`. The CLI rejects unknown names and invalid values before formatting anything.
7. **Echo the mapping.** Before or alongside running the command, tell the user which options their phrases became, e.g. "leading commas → `--leadingComma=true`".

## Styles

| Option | Values (default **bold**) | Typical phrases |
|---|---|---|
| `formattingStrategy` | **`LIGHTWEIGHT`**, `NORMALISED_COMPACT`, `NORMALISED_EXPANDED` | "keep my line breaks" / "minimal changes" → `LIGHTWEIGHT`; "fully reformat", "normalise", "compact" → `NORMALISED_COMPACT`; "expanded", "one element per line", "vertical" → `NORMALISED_EXPANDED` |
| `dmlStyle` | `DEDICATED_KEYWORD_LINES`, **`RIGHT_ALIGNED_KEYWORDS`**, `LEFT_ALIGNED_KEYWORDS_ALIGN_CONTINUATIONS`, `LEFT_ALIGNED_KEYWORDS_INDENT_CONTINUATIONS`, `PADDED_KEYWORDS` | "keywords on their own line" → `DEDICATED_KEYWORD_LINES`; "river style", "right-aligned keywords" → `RIGHT_ALIGNED_KEYWORDS`; "left-aligned keywords" → ask which `LEFT_ALIGNED_*` variant (aligned vs indented continuations); "padded keywords" → `PADDED_KEYWORDS` |
| `parameterDeclarationStyle` | **`BLOCK`**, `BLOCK_NEXT_LINE`, `HANGING` | "opening parenthesis on its own line" → `BLOCK_NEXT_LINE`; "hanging parameters", "parameters aligned after the name" → `HANGING` |
| `inListStyle` | **`BLOCK`**, `BLOCK_NEXT_LINE`, `HANGING` | same phrasing as above, for `IN (...)` lists |
| `subqueryStyle` | **`BLOCK`**, `BLOCK_NEXT_LINE`, `HANGING` | same phrasing as above, for subqueries |

If the user asks for one parenthesis style without saying where ("hanging parentheses"), ask whether it applies to parameter declarations, IN-lists, subqueries, or all three.

## Case and size

| Option | Values (default **bold**) | Typical phrases |
|---|---|---|
| `keywordCase` | `UPPER`, **`LOWER`**, `INITCAP`, `WORDCAP`, `PRESERVE` | "uppercase keywords", "SQL keywords in caps" → `UPPER`; "keep keyword case" → `PRESERVE` |
| `identifierCase` | `UPPER`, **`LOWER`**, `INITCAP`, `WORDCAP`, `PRESERVE` | "uppercase identifiers/names" → `UPPER`; "don't change identifier case" → `PRESERVE` |
| `maxLineSize` | **`120`** (40–1000) | "max line length 100", "wrap at 80 columns" |
| `shortExpressionSize` | **`60`** (1–1000) | "collapse expressions up to N chars"; not changed automatically when `maxLineSize` changes |

`INITCAP` capitalises only the first letter (`Autonomous_transaction`); `WORDCAP` capitalises each underscore-separated word (`Autonomous_Transaction`). If the user says "title case" or "capitalised", ask which.

## Indentation and whitespace

| Option | Values (default **bold**) | Typical phrases |
|---|---|---|
| `tabSize` | **`3`** (1–8) | "2-space indent", "indent by 4" |
| `insertSpaces` | **`true`** | "indent with tabs" → `false` |
| `trimTrailingWhitespace` | **`true`** | "keep trailing whitespace" → `false` |
| `removeDuplicateBlankLines` | **`true`** | "keep multiple blank lines" → `false` |
| `trimLeadingNewlines` | **`true`** | "keep blank lines at the start of the file" → `false` |
| `trimFinalNewlines` | **`true`** | "keep blank lines at the end of the file" → `false` |
| `insertFinalNewline` | **`true`** | "no newline at end of file" → `false` |
| `blankLinesBetweenStatementMode` | `NEVER`, `ALWAYS`, **`BY_STATEMENT_LINES`** | "no blank lines between statements" → `NEVER`; "blank line between every statement" → `ALWAYS` |
| `minStatementLines` | **`2`** (1–1000) | "only separate statements with N+ lines" |

## Line breaks within statements

| Option | Values (default **bold**) | Typical phrases |
|---|---|---|
| `preserveSingleLineStatements` | **`true`** | "always break statements over multiple lines" → `false` |
| `preserveSingleLineCaseExpressions` | **`true`** | "always expand CASE expressions" → `false` |
| `leadingComma` | **`false`** | "leading commas", "commas first" → `true` |
| `leadingConcatenationOperator` | **`true`** | "`\|\|` at the end of the line", "trailing concatenation" → `false` |
| `leadingLogicalOperator` | **`true`** | "AND/OR at the end of the line", "trailing logical operators" → `false` |
| `labelOnSeparateLine` | **`true`** | "labels on the same line as the loop" → `false` |
| `loopKeywordOnSeparateLine` | **`false`** | "LOOP on its own line" → `true` |
| `thenKeywordOnSeparateLine` | **`false`** | "THEN on its own line" → `true` |
| `joinOnKeywordOnSeparateLine` | **`false`** | "ON clause on its own line" → `true` |

## Spacing

| Option | Values (default **bold**) | Typical phrases |
|---|---|---|
| `spaceAfterComma` | **`true`** | "no space after commas" → `false` |
| `spaceAfterCommaInDatatypes` | **`false`** | "`number(10, 2)` with a space" → `true` (takes precedence over `spaceAfterComma` in datatypes) |
| `spaceAroundOperators` | **`true`** | "no spaces around operators", "compact expressions" → `false` |
| `spaceInsideParentheses` | **`false`** | "spaces inside parentheses", "`( a + b )`" → `true` |
| `spaceAroundParentheses` | **`true`** | "no space around parentheses" → `false` |
| `spaceBeforeFunctionParentheses` | **`false`** | "space between function name and parenthesis" → `true` |

## Alignment

| Option | Values (default **bold**) | Typical phrases |
|---|---|---|
| `alignTypeDeclarations` | **`true`** | "don't align declarations" → `false` |
| `alignColumnAliases` | **`true`** | "don't align column aliases" → `false` |
| `alignTableAliases` | **`false`** | "align table aliases" → `true` |
| `alignNamedArguments` | **`true`** | "don't align `=>`" → `false` |
| `alignAssignments` | **`true`** | "don't align `:=`" → `false` |
| `alignEqualityOperators` | **`false`** | "align `=` in WHERE clauses" → `true` |
| `alignLogicalOperatorsWithKeywords` | **`true`** | "indent AND/OR under the condition instead" → `false` |
| `alignCommentAsterisks` | **`true`** | "leave block comments alone" → `false` |
| `alignTrailingComments` | **`false`** | "align end-of-line comments" → `true` |

"No alignment at all" / "don't align anything" → set every alignment option that defaults to `true` to `false`; confirm the resulting list with the user if it's not obvious that's what they meant.

## Strategy interactions (options that are ignored)

With `formattingStrategy=LIGHTWEIGHT` (the default), existing whitespace is kept and only some options are applied:

- **No effect:** `parameterDeclarationStyle`, `inListStyle`, `blankLinesBetweenStatementMode`, `minStatementLines`.
- **Only enforced when `true`** (setting them to `false` doesn't undo existing line breaks): `leadingConcatenationOperator`, `leadingLogicalOperator`, `labelOnSeparateLine`, `loopKeywordOnSeparateLine`, `thenKeywordOnSeparateLine`, `joinOnKeywordOnSeparateLine`, `alignTrailingComments`.

With `NORMALISED_COMPACT` or `NORMALISED_EXPANDED`, original whitespace between tokens is ignored, so `removeDuplicateBlankLines` has no effect. `NORMALISED_EXPANDED` also ignores `preserveSingleLineStatements`.

Code between `@formatter:off` / `noformat start` and `@formatter:on` / `noformat end` comments (case-insensitive) is never reformatted, whatever the options. Statements the IslandSQL grammar doesn't support are passed through with their original whitespace.
