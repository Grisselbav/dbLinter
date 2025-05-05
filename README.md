# dbLinter

## Introduction

dbLinter is a suite for checking and improving the quality of database applications. Quality is assessed using static
code analysis and database queries based on a configuration. A configuration is primarily centrally managed. It contains
file patterns, rules, validators, SQL-based tests, parameters, and connect information for read-only database access
within checks and tests.

The following subscription plans are in progress:

|                                                      | Anonymous | Free | Essential | Professional |
|------------------------------------------------------|:---------:|:----:|:---------:|:------------:|
| Number of seats                                      | unlimited |  1   |    1-n    |     1-n      |
| Number of configurations                             |     -     |  1   | unlimited |  unlimited   |
| View rules and related data                          |    yes    | yes  |    yes    |     yes      |
| Manage configurations                                |     -     | yes  |    yes    |     yes      |
| Run checks                                           |    yes    | yes  |    yes    |     yes      |
| Run SQL-based tests                                  |     -     | yes  |    yes    |     yes      |
| Ignore chosen SQL-based test findings                |     -     | yes  |    yes    |     yes      |
| dbLinter VS Code extension                           |    yes    | yes  |    yes    |     yes      |
| Run all accessible checks and tests                  |     -     |  -   |    yes    |     yes      |
| Quick fixes in dbLinter VS Code extension            |     -     |  -   |    yes    |     yes      |
| dbLinter CLI with SonarCloud integration             |     -     |  -   |    yes    |     yes      |
| Manage user access                                   |     -     |  -   |    yes    |     yes      |
| dbLinter SonarQube plugin                            |     -     |  -   |     -     |     yes      |
| Access to dbLinter test repository                   |     -     |  -   |     -     |     yes      |
| Custom rules, checks and SQL-based tests             |     -     |  -   |     -     |     yes      |
| Generate Java project for checks and SQL-based tests |     -     |  -   |     -     |     yes      |
| Manage custom validators (plugins)                   |     -     |  -   |     -     |     yes      |
| Export rules and configurations                      |     -     |  -   |     -     |     yes      |
| Import rules and configurations                      |     -     |  -   |     -     |     yes      |

The feature set and default configuration are subject to change.

The following rules are enabled for the Anonymous plan.

- [G-1030: Avoid defining variables that are not used.](https://dblinter-rules.united-codes.com/rules/G-1030)
- [G-1060: Avoid storing ROWIDs or UROWIDs in database tables.](https://dblinter-rules.united-codes.com/rules/G-1060)
- [G-1080: Avoid using the same expression on both sides of a relational comparison operator or a logical operator.](https://dblinter-rules.united-codes.com/rules/G-1080)
- [G-1910: Avoid using the NOSONAR marker.](https://dblinter-rules.united-codes.com/rules/G-1910)
- [G-1920: Avoid syntax errors.](https://dblinter-rules.united-codes.com/rules/G-1920)
- [G-2150: Avoid comparisons with NULL value, consider using IS \[NOT\] NULL.](https://dblinter-rules.united-codes.com/rules/G-2150)
- [G-3185: Never use ROWNUM at the same query level as ORDER BY.](https://dblinter-rules.united-codes.com/rules/G-3185)
- [G-4120: Avoid using \%NOTFOUND directly after the FETCH when working with BULK OPERATIONS and LIMIT clause.](https://dblinter-rules.united-codes.com/rules/G-4120)
- [G-4230: Always use a COALESCE instead of a NVL command, if parameter 2 of the NVL function is a function call or a SELECT statement.](https://dblinter-rules.united-codes.com/rules/G-4230)
- [G-4250: Avoid using identical conditions in different branches of the same IF or CASE statement.](https://dblinter-rules.united-codes.com/rules/G-4250)
- [G-4320: Always label your loops.](https://dblinter-rules.united-codes.com/rules/G-4320)
- [G-5080: Always use FORMAT_ERROR_BACKTRACE when using FORMAT_ERROR_STACK or SQLERRM.](https://dblinter-rules.united-codes.com/rules/G-5080)
- [G-7230: Avoid declaring global variables public.](https://dblinter-rules.united-codes.com/rules/G-7230/)
- [G-7810: Never use SQL inside PL/SQL to read sequence numbers (or SYSDATE).](https://dblinter-rules.united-codes.com/rules/G-7810)
- [G-9010: Always use a format model in string to date/time conversion functions.](https://dblinter-rules.united-codes.com/rules/G-9010)
- [G-9501: Never use parameter in string expression of dynamic SQL. Use asserted local variable instead.](https://dblinter-rules.united-codes.com/rules/G-9501)
- [G-9600: Never define more than one comment with hints.](https://dblinter-rules.united-codes.com/rules/G-9600)
- [G-9601: Never use unknown hints.](https://dblinter-rules.united-codes.com/rules/G-9601)
- [G-9602: Always use the alias name instead of the table name.](https://dblinter-rules.united-codes.com/rules/G-9602)
- [G-9603: Never reference an unknown table/alias.](https://dblinter-rules.united-codes.com/rules/G-9603)
- [G-9604: Never use an invalid stats method.](https://dblinter-rules.united-codes.com/rules/G-9604)
- [G-9605: Never use an invalid stats keyword.](https://dblinter-rules.united-codes.com/rules/G-9605)

The following rules should be configured to produce a reasonable results. Therefore, they are disabled for the Anonymous plan.

- [G-1050: Avoid using literals in your code.](https://dblinter-rules.united-codes.com/rules/G-1050)
- [G-1110: Avoid connect users that own database objects.](https://dblinter-rules.united-codes.com/rules/G-1110)
- [G-1120: Avoid granting system privileges to connect users.](https://dblinter-rules.united-codes.com/rules/G-1120)
- [G-1130: Avoid granting table access to API roles.](https://dblinter-rules.united-codes.com/rules/G-1130)
- [G-1140: Avoid granting object privileges directly to connect users.](https://dblinter-rules.united-codes.com/rules/G-1140)
- [G-1150: Always limit privileges of schema owners according to principle of least privileges.](https://dblinter-rules.united-codes.com/rules/G-1150)
- [G-1210: Never create a table without a primary key.](https://dblinter-rules.united-codes.com/rules/G-1210)
- [G-1220: Avoid composite primary keys.](https://dblinter-rules.united-codes.com/rules/G-1220)
- [G-1230: Avoid tables without relationships.](https://dblinter-rules.united-codes.com/rules/G-1230)
- [G-1240: Try to index foreign key columns.](https://dblinter-rules.united-codes.com/rules/G-1240)
- [G-1250: Try to define a business key for each table.](https://dblinter-rules.united-codes.com/rules/G-1250)
- [G-1260: Try to define a comment for each table.](https://dblinter-rules.united-codes.com/rules/G-1260)
- [G-1270: Try to define a comment for each column.](https://dblinter-rules.united-codes.com/rules/G-1270)
- [G-1280: Try to use domains instead of raw datatypes for table columns.](https://dblinter-rules.united-codes.com/rules/G-1280)
- [G-1310: Never keep database objects in an invalid state.](https://dblinter-rules.united-codes.com/rules/G-1310)
- [G-3160: Avoid visible virtual columns.](https://dblinter-rules.united-codes.com/rules/G-3160)
- [G-7460: Try to define your packaged/standalone function deterministic if appropriate.](https://dblinter-rules.united-codes.com/rules/G-7460)
- [G-9101: Always follow naming conventions for global variables.](https://dblinter-rules.united-codes.com/rules/G-9101)
- [G-9102: Always follow naming conventions for local variables.](https://dblinter-rules.united-codes.com/rules/G-9102)
- [G-9103: Always follow naming conventions for cursor variables.](https://dblinter-rules.united-codes.com/rules/G-9103)
- [G-9104: Always follow naming conventions for record variables.](https://dblinter-rules.united-codes.com/rules/G-9104)
- [G-9105: Always follow naming conventions for collection variables (arrays/tables).](https://dblinter-rules.united-codes.com/rules/G-9105)
- [G-9106: Always follow naming conventions for object variables.](https://dblinter-rules.united-codes.com/rules/G-9106)
- [G-9107: Always follow naming conventions for cursor parameters.](https://dblinter-rules.united-codes.com/rules/G-9107)
- [G-9108: Always follow naming conventions for IN parameters of functions and procedures.](https://dblinter-rules.united-codes.com/rules/G-9108)
- [G-9109: Always follow naming conventions for OUT parameters of functions and procedures.](https://dblinter-rules.united-codes.com/rules/G-9109)
- [G-9110: Always follow naming conventions for IN/OUT parameters of functions and procedures.](https://dblinter-rules.united-codes.com/rules/G-9110)
- [G-9111: Always follow naming conventions for record type definitions.](https://dblinter-rules.united-codes.com/rules/G-9111)
- [G-9112: Always follow naming conventions for collection type definitions (arrays/tables).](https://dblinter-rules.united-codes.com/rules/G-9112)
- [G-9113: Always follow naming conventions for exceptions.](https://dblinter-rules.united-codes.com/rules/G-9113)
- [G-9114: Always follow naming conventions for constants.](https://dblinter-rules.united-codes.com/rules/G-9114)
- [G-9115: Always follow naming conventions for subtypes.](https://dblinter-rules.united-codes.com/rules/G-9115)
- [G-9116: Always follow naming conventions for record fields.](https://dblinter-rules.united-codes.com/rules/G-9116)

## Components

The dbLinter suite consists of the following components:

| Component                                                                                    | Description                                                                                             |
|----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| [Web-GUI](https://preview.dblinter.app/)                                                     | Managing tenant-specific data, like rules, configurations, user access.                                 |
| [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=Grisselbav.dblinter) | Checking and fixing SQL files while editing. Running SQL-based tests.                                   |
| CLI                                                                                          | Running checks and SQL-based tests from the command line producing output for 3rd party tools.          |
| SonarQube Plugin                                                                             | Running checks via SonarScanner with integration into SonarQube's repository with all its features.     |
| [Static Rules Site](https://dblinter-rules.united-codes.com/)                                | Generated, static website with all public rules. Rules are referenced in problems panel within VS Code. |

## Releases

Releases of the VS Code extensions are published in the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Grisselbav.dblinter).

Releases of CLI and SonarQube Plugin will be published on the [Releases page](https://github.com/Grisselbav/dbLinter/releases) of this repository.
