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

## Anonymous Plan

The following rules are enabled for the Anonymous plan.

- [G-1030: Avoid defining variables that are not used.](https://dblinter-rules.united-codes.com/rules/G-1030)
- [G-1040: Avoid dead code.](https://dblinter-rules.united-codes.com/rules/G-1040)
- [G-1060: Avoid storing ROWIDs or UROWIDs in database tables.](https://dblinter-rules.united-codes.com/rules/G-1060)
- [G-1080: Avoid using the same expression on both sides of a relational comparison operator or a logical operator.](https://dblinter-rules.united-codes.com/rules/G-1080)
- [G-1920: Avoid syntax errors.](https://dblinter-rules.united-codes.com/rules/G-1920)
- [G-2135: Avoid assigning values to local variables that are not used by a subsequent statement.](https://dblinter-rules.united-codes.com/rules/G-2135/)
- [G-2140: Never initialize variables with NULL.](https://dblinter-rules.united-codes.com/rules/G-2140/)
- [G-2145: Never self-assign a variable.](https://dblinter-rules.united-codes.com/rules/G-2145/)
- [G-2150: Avoid comparisons with NULL value, consider using IS \[NOT\] NULL.](https://dblinter-rules.united-codes.com/rules/G-2150)
- [G-2170: Never overload variables.](https://dblinter-rules.united-codes.com/rules/G-2170)
- [G-2180: Never use quoted identifiers.](https://dblinter-rules.united-codes.com/rules/G-2180)
- [G-2190: Avoid using ROWID or UROWID.](https://dblinter-rules.united-codes.com/rules/G-2190/)
- [G-2210: Avoid declaring NUMBER variables, constants or subtypes with no precision.](https://dblinter-rules.united-codes.com/rules/G-2210/)
- [G-2220: Try to use PLS_INTEGER instead of NUMBER for arithmetic operations with integer values.](https://dblinter-rules.united-codes.com/rules/G-2220/)
- [G-2230: Try to use SIMPLE_INTEGER datatype when appropriate.](https://dblinter-rules.united-codes.com/rules/G-2230/)
- [G-2310: Avoid using CHAR data type.](https://dblinter-rules.united-codes.com/rules/G-2310/)
- [G-2320: Never use VARCHAR data type.](https://dblinter-rules.united-codes.com/rules/G-2320/)
- [G-2330: Never use zero-length strings to substitute NULL.](https://dblinter-rules.united-codes.com/rules/G-2330/)
- [G-2340: Always define your VARCHAR2 variables using CHAR SEMANTIC (if not defined anchored).](https://dblinter-rules.united-codes.com/rules/G-2340/)
- [G-2510: Avoid using the LONG and LONG RAW data types.](https://dblinter-rules.united-codes.com/rules/G-2510/)
- [G-2610: Never use self-defined weak ref cursor types.](https://dblinter-rules.united-codes.com/rules/G-2610/)
- [G-3110: Always specify the target columns when coding an insert statement.](https://dblinter-rules.united-codes.com/rules/G-3110/)
- [G-3115: Avoid self-assigning a column.](https://dblinter-rules.united-codes.com/rules/G-3115/)
- [G-3120: Always use table aliases when your SQL statement involves more than one source.](https://dblinter-rules.united-codes.com/rules/G-3120/)
- [G-3145: Avoid using SELECT * directly from a table or view.](https://dblinter-rules.united-codes.com/rules/G-3145/)
- [G-3170: Always use DEFAULT ON NULL declarations to assign default values to table columns if you refuse to store NULL values.](https://dblinter-rules.united-codes.com/rules/G-3170/)
- [G-3180: Always specify column names instead of positional references in ORDER BY clauses.](https://dblinter-rules.united-codes.com/rules/G-3180/)
- [G-3182: Always specify column names/aliases instead of positional references in GROUP BY clauses.](https://dblinter-rules.united-codes.com/rules/G-3182/)
- [G-3185: Never use ROWNUM at the same query level as ORDER BY.](https://dblinter-rules.united-codes.com/rules/G-3185)
- [G-3190: Avoid using NATURAL JOIN.](https://dblinter-rules.united-codes.com/rules/G-3190)
- [G-3195: Always use wildcards in a LIKE clause.](https://dblinter-rules.united-codes.com/rules/G-3195)
- [G-3220: Always process saved exceptions from a FORALL statement.](https://dblinter-rules.united-codes.com/rules/G-3220)
- [G-3310: Never commit within a cursor loop.](https://dblinter-rules.united-codes.com/rules/G-3310)
- [G-3330: Avoid autonomous transactions.](https://dblinter-rules.united-codes.com/rules/G-3330)
- [G-4120: Avoid using \%NOTFOUND directly after the FETCH when working with BULK OPERATIONS and LIMIT clause.](https://dblinter-rules.united-codes.com/rules/G-4120)
- [G-4130: Always close locally opened cursors.](https://dblinter-rules.united-codes.com/rules/G-4130)
- [G-4140: Avoid executing any statements between a SQL operation and the usage of an implicit cursor attribute.](https://dblinter-rules.united-codes.com/rules/G-4140)
- [G-4230: Always use a COALESCE instead of a NVL command, if parameter 2 of the NVL function is a function call or a SELECT statement.](https://dblinter-rules.united-codes.com/rules/G-4230)
- [G-4240: Always use a CASE instead of a NVL2 command if parameter 2 or 3 of NVL2 is either a function call or a SELECT statement.](https://dblinter-rules.united-codes.com/rules/G-4240/)
- [G-4250: Avoid using identical conditions in different branches of the same IF or CASE statement.](https://dblinter-rules.united-codes.com/rules/G-4250)
- [G-4310: Never use GOTO statements in your code.](https://dblinter-rules.united-codes.com/rules/G-4310/)
- [G-4350: Always use 1 as lower and COUNT() as upper bound when looping through a dense array.](https://dblinter-rules.united-codes.com/rules/G-4350)
- [G-4387: Never use a FOR LOOP for a query that should return not more than one row.](https://dblinter-rules.united-codes.com/rules/G-4387)
- [G-5020: Never handle unnamed exceptions using the error number.](https://dblinter-rules.united-codes.com/rules/G-5020/)
- [G-5030: Never assign predefined exception names to user defined exceptions.](https://dblinter-rules.united-codes.com/rules/G-5030/)
- [G-5070: Avoid using Oracle predefined exceptions.](https://dblinter-rules.united-codes.com/rules/G-5070/)
- [G-5080: Always use FORMAT_ERROR_BACKTRACE when using FORMAT_ERROR_STACK or SQLERRM.](https://dblinter-rules.united-codes.com/rules/G-5080)
- [G-7230: Avoid declaring global variables public.](https://dblinter-rules.united-codes.com/rules/G-7230/)
- [G-7330: Always assign values to OUT parameters.](https://dblinter-rules.united-codes.com/rules/G-7330/)
- [G-7450: Never return a NULL value from a BOOLEAN function.](https://dblinter-rules.united-codes.com/rules/G-7450/)
- [G-7720: Never use multiple UPDATE OF in trigger event clause.](https://dblinter-rules.united-codes.com/rules/G-7720/)
- [G-7810: Never use SQL inside PL/SQL to read sequence numbers (or SYSDATE).](https://dblinter-rules.united-codes.com/rules/G-7810)
- [G-7910: Never use DML within a SQL macro.](https://dblinter-rules.united-codes.com/rules/G-7910)
- [G-8110: Never use SELECT COUNT(\*) if you are only interested in the existence of a row.](https://dblinter-rules.united-codes.com/rules/G-8110/)
- [G-9010: Always use a format model in string to date/time conversion functions.](https://dblinter-rules.united-codes.com/rules/G-9010)
- [G-9040: Try using FX in string to date/time conversion format model to avoid fuzzy conversion.](https://dblinter-rules.united-codes.com/rules/G-9040)
- [G-9501: Never use parameter in string expression of dynamic SQL. Use asserted local variable instead.](https://dblinter-rules.united-codes.com/rules/G-9501)
- [G-9600: Never define more than one comment with hints.](https://dblinter-rules.united-codes.com/rules/G-9600)
- [G-9601: Never use unknown hints.](https://dblinter-rules.united-codes.com/rules/G-9601)
- [G-9602: Always use the alias name instead of the table name.](https://dblinter-rules.united-codes.com/rules/G-9602)
- [G-9603: Never reference an unknown table/alias.](https://dblinter-rules.united-codes.com/rules/G-9603)
- [G-9604: Never use an invalid stats method.](https://dblinter-rules.united-codes.com/rules/G-9604)
- [G-9605: Never use an invalid stats keyword.](https://dblinter-rules.united-codes.com/rules/G-9605)

The following rules should be configured: Either they require parameters that are not applicable to any project, or they are candidates for disabling on a project-by-project basis. Therefore, these rules are disabled for the Anonymous plan.

To enable some or all rules you need to create a dbLinter account. Visit the [dbLinter Web-GUI](https://preview.dblinter.app/) click on `Sign in` and then on `Sign-up` and follow the instructions.

- [G-1010: Try to label your sub blocks.](https://dblinter-rules.united-codes.com/rules/G-1010)
- [G-1020: Always have a matching loop or block label.](https://dblinter-rules.united-codes.com/rules/G-1020)
- [G-1050: Avoid using literals in your code.](https://dblinter-rules.united-codes.com/rules/G-1050)
- [G-1070: Avoid nesting comment blocks.](https://dblinter-rules.united-codes.com/rules/G-1070)
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
- [G-1910: Avoid using the NOSONAR marker.](https://dblinter-rules.united-codes.com/rules/G-1910)
- [G-2110: Try to use anchored declarations for variables, constants and types.](https://dblinter-rules.united-codes.com/rules/G-2110)
- [G-2120: Try to have a single location to define your types.](https://dblinter-rules.united-codes.com/rules/G-2120)
- [G-2130: Try to use subtypes for constructs used often in your code.](https://dblinter-rules.united-codes.com/rules/G-2130)
- [G-2160: Avoid initializing variables using functions in the declaration section.](https://dblinter-rules.united-codes.com/rules/G-2160)
- [G-2185: Avoid using overly short names for explicitly or implicitly declared identifiers.](https://dblinter-rules.united-codes.com/rules/G-2185)
- [G-2410: Try to use boolean data type for values with dual meaning.](https://dblinter-rules.united-codes.com/rules/G-2410)
- [G-3130: Try to use ANSI SQL-92 join syntax.](https://dblinter-rules.united-codes.com/rules/G-3130)
- [G-3140: Try to use anchored records as targets for your cursors.](https://dblinter-rules.united-codes.com/rules/G-3140)
- [G-3150: Try to use identity columns for surrogate keys.](https://dblinter-rules.united-codes.com/rules/G-3150)
- [G-3160: Avoid visible virtual columns.](https://dblinter-rules.united-codes.com/rules/G-3160)
- [G-3183: Always specify column aliases instead of expressions in GROUP BY clauses.](https://dblinter-rules.united-codes.com/rules/G-3183/)
- [G-3210: Always use BULK OPERATIONS (BULK COLLECT, FORALL) whenever you have to execute a DML statement for more than 4 times.](https://dblinter-rules.united-codes.com/rules/G-3210)
- [G-3320: Try to move transactions within a non-cursor loop into procedures.](https://dblinter-rules.united-codes.com/rules/G-3320)
- [G-4320: Always label your loops.](https://dblinter-rules.united-codes.com/rules/G-4320)
- [G-7460: Try to define your packaged/standalone function deterministic if appropriate.](https://dblinter-rules.united-codes.com/rules/G-7460)
- [G-7510: Always prefix Oracle supplied packages with owner schema name.](https://dblinter-rules.united-codes.com/rules/G-7510)
- [G-8210: Always use synonyms when accessing objects of another application schema.](https://dblinter-rules.united-codes.com/rules/G-8210/)
- [G-8410: Always use application locks to ensure a program unit is only running once at a given time.](https://dblinter-rules.united-codes.com/rules/G-8410/)
- [G-9020: Try to use a format model and NLS_NUMERIC_CHARACTERS in string to number conversion functions.](https://dblinter-rules.united-codes.com/rules/G-9020/)
- [G-9030: Try to define a default value on conversion errors.](https://dblinter-rules.united-codes.com/rules/G-9030)
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
- [G-9201: Always follow naming conventions for tables.](https://dblinter-rules.united-codes.com/rules/G-9201)
- [G-9202: Always follow naming conventions for table/view columns.](https://dblinter-rules.united-codes.com/rules/G-9202)
- [G-9203: Always follow naming conventions for indexes.](https://dblinter-rules.united-codes.com/rules/G-9203)
- [G-9204: Always follow naming conventions for primary key constraints.](https://dblinter-rules.united-codes.com/rules/G-9204)
- [G-9205: Always follow naming conventions for unique constraints.](https://dblinter-rules.united-codes.com/rules/G-9205)
- [G-9206: Always follow naming conventions for foreign key constraints.](https://dblinter-rules.united-codes.com/rules/G-9206)
- [G-9207: Always follow naming conventions for check constraints.](https://dblinter-rules.united-codes.com/rules/G-9207)
- [G-9208: Always follow naming conventions for assertions.](https://dblinter-rules.united-codes.com/rules/G-9208)
- [G-9209: Always follow naming conventions for global temporary tables.](https://dblinter-rules.united-codes.com/rules/G-9209)
- [G-9210: Always follow naming conventions for views.](https://dblinter-rules.united-codes.com/rules/G-9210)
- [G-9211: Always follow naming conventions for sequences.](https://dblinter-rules.united-codes.com/rules/G-9211)
- [G-9212: Always follow naming conventions for synonyms.](https://dblinter-rules.united-codes.com/rules/G-9212)
- [G-9213: Always follow naming conventions for triggers.](https://dblinter-rules.united-codes.com/rules/G-9213)
- [G-9214: Always follow naming conventions for PL/SQL packages..](https://dblinter-rules.united-codes.com/rules/G-9214)
- [G-9215: Always follow naming conventions for functions.](https://dblinter-rules.united-codes.com/rules/G-9215)
- [G-9216: Always follow naming conventions for procedures.](https://dblinter-rules.united-codes.com/rules/G-9216)
- [G-9217: Always follow naming conventions for object types.](https://dblinter-rules.united-codes.com/rules/G-9217)
- [G-9218: Always follow naming conventions for object type attributes.](https://dblinter-rules.united-codes.com/rules/G-9218)
- [G-9219: Always follow naming conventions for collection types.](https://dblinter-rules.united-codes.com/rules/G-9219)

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
