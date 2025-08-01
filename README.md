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

The following 68 rules are enabled for the Anonymous plan.

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
- [G-4325: Never reuse labels in inner scope.](https://dblinter-rules.united-codes.com/rules/G-4325/)
- [G-4350: Always use 1 as lower and COUNT() as upper bound when looping through a dense array.](https://dblinter-rules.united-codes.com/rules/G-4350)
- [G-4360: Always use a WHILE loop to process a loose array.](https://dblinter-rules.united-codes.com/rules/G-4360)
- [G-4385: Never use a cursor for loop to check whether a cursor returns data.](https://dblinter-rules.united-codes.com/rules/G-4385)
- [G-4387: Never use a FOR LOOP for a query that should return not more than one row.](https://dblinter-rules.united-codes.com/rules/G-4387)
- [G-5020: Never handle unnamed exceptions using the error number.](https://dblinter-rules.united-codes.com/rules/G-5020/)
- [G-5030: Never assign predefined exception names to user defined exceptions.](https://dblinter-rules.united-codes.com/rules/G-5030/)
- [G-5070: Avoid using Oracle predefined exceptions.](https://dblinter-rules.united-codes.com/rules/G-5070/)
- [G-5080: Always use FORMAT_ERROR_BACKTRACE when using FORMAT_ERROR_STACK or SQLERRM.](https://dblinter-rules.united-codes.com/rules/G-5080)
- [G-7140: Always ensure that locally defined procedures or functions are referenced.](https://dblinter-rules.united-codes.com/rules/G-7140)
- [G-7230: Avoid declaring global variables public.](https://dblinter-rules.united-codes.com/rules/G-7230/)
- [G-7330: Always assign values to OUT parameters.](https://dblinter-rules.united-codes.com/rules/G-7330/)
- [G-7450: Never return a NULL value from a BOOLEAN function.](https://dblinter-rules.united-codes.com/rules/G-7450/)
- [G-7720: Never use multiple UPDATE OF in trigger event clause.](https://dblinter-rules.united-codes.com/rules/G-7720/)
- [G-7810: Never use SQL inside PL/SQL to read sequence numbers (or SYSDATE).](https://dblinter-rules.united-codes.com/rules/G-7810)
- [G-7910: Never use DML within a SQL macro.](https://dblinter-rules.united-codes.com/rules/G-7910)
- [G-8110: Never use SELECT COUNT(\*) if you are only interested in the existence of a row.](https://dblinter-rules.united-codes.com/rules/G-8110/)
- [G-8120: Never check existence of a row to decide whether to create it or not.](https://dblinter-rules.united-codes.com/rules/G-8120/)
- [G-9010: Always use a format model in string to date/time conversion functions.](https://dblinter-rules.united-codes.com/rules/G-9010)
- [G-9040: Try using FX in string to date/time conversion format model to avoid fuzzy conversion.](https://dblinter-rules.united-codes.com/rules/G-9040)
- [G-9501: Never use parameter in string expression of dynamic SQL. Use asserted local variable instead.](https://dblinter-rules.united-codes.com/rules/G-9501)
- [G-9600: Never define more than one comment with hints.](https://dblinter-rules.united-codes.com/rules/G-9600)
- [G-9601: Never use unknown hints.](https://dblinter-rules.united-codes.com/rules/G-9601)
- [G-9602: Always use the alias name instead of the table name.](https://dblinter-rules.united-codes.com/rules/G-9602)
- [G-9603: Never reference an unknown table/alias.](https://dblinter-rules.united-codes.com/rules/G-9603)
- [G-9604: Never use an invalid stats method.](https://dblinter-rules.united-codes.com/rules/G-9604)
- [G-9605: Never use an invalid stats keyword.](https://dblinter-rules.united-codes.com/rules/G-9605)

The following 115 rules should be configured: Either they require parameters that are not applicable to any project, or they are candidates for disabling on a project-by-project basis. Therefore, these rules are disabled for the Anonymous plan.

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
- [G-4110: Always use %NOTFOUND instead of NOT %FOUND to check whether a cursor returned data.](https://dblinter-rules.united-codes.com/rules/G-4110)
- [G-4210: Try to use CASE rather than an IF statement with multiple ELSIF paths.](https://dblinter-rules.united-codes.com/rules/G-4210)
- [G-4220: Try to use CASE rather than DECODE.](https://dblinter-rules.united-codes.com/rules/G-4220)
- [G-4260: Avoid inverting boolean conditions with NOT.](https://dblinter-rules.united-codes.com/rules/G-4260)
- [G-4270: Avoid comparing boolean values to boolean literals.](https://dblinter-rules.united-codes.com/rules/G-4270)
- [G-4320: Always label your loops.](https://dblinter-rules.united-codes.com/rules/G-4320)
- [G-4330: Always use a CURSOR FOR loop to process the complete cursor results unless you are using bulk operations.](https://dblinter-rules.united-codes.com/rules/G-4330)
- [G-4340: Always use a NUMERIC FOR loop to process a dense array.](https://dblinter-rules.united-codes.com/rules/G-4340)
- [G-4365: Never use unconditional CONTINUE or EXIT in a loop.](https://dblinter-rules.united-codes.com/rules/G-4365)
- [G-4370: Avoid using EXIT to stop loop processing unless you are in a basic loop.](https://dblinter-rules.united-codes.com/rules/G-4370)
- [G-4375: Always use EXIT WHEN instead of an IF statement to exit from a loop.](https://dblinter-rules.united-codes.com/rules/G-4375)
- [G-4380: Try to label your EXIT WHEN statements.](https://dblinter-rules.united-codes.com/rules/G-4380)
- [G-4390: Avoid use of unreferenced FOR loop indexes.](https://dblinter-rules.united-codes.com/rules/G-4390)
- [G-4395: Avoid hard-coded upper or lower bound values with FOR loops.](https://dblinter-rules.united-codes.com/rules/G-4395)
- [G-5010: Try to use a error/logging framework for your application.](https://dblinter-rules.united-codes.com/rules/G-5010)
- [G-5040: Avoid use of WHEN OTHERS clause in an exception section without any other specific handlers.](https://dblinter-rules.united-codes.com/rules/G-5040)
- [G-5050: Avoid use of the RAISE_APPLICATION_ERROR built-in procedure with a hard-coded 20nnn error number or hard-coded message.](https://dblinter-rules.united-codes.com/rules/G-5050)
- [G-5060: Avoid unhandled exceptions.](https://dblinter-rules.united-codes.com/rules/G-5060)
- [G-6010: Always use a character variable to execute dynamic SQL.](https://dblinter-rules.united-codes.com/rules/G-6010)
- [G-6020: Try to use output bind arguments in the RETURNING INTO clause of dynamic DML statements rather than the USING clause.](https://dblinter-rules.united-codes.com/rules/G-6020)
- [G-7110: Try to use named notation when calling program units.](https://dblinter-rules.united-codes.com/rules/G-7110)
- [G-7120: Always add the name of the program unit to its end keyword.](https://dblinter-rules.united-codes.com/rules/G-7120)
- [G-7125: Always use CREATE OR REPLACE instead of CREATE alone.](https://dblinter-rules.united-codes.com/rules/G-7125)
- [G-7130: Always use parameters or pull in definitions rather than referencing external variables in a local program unit.](https://dblinter-rules.united-codes.com/rules/G-7130)
- [G-7150: Try to remove unused parameters.](https://dblinter-rules.united-codes.com/rules/G-7150)
- [G-7160: Always explicitly state parameter mode.](https://dblinter-rules.united-codes.com/rules/G-7160)
- [G-7170: Avoid using an IN OUT parameter as IN or OUT only.](https://dblinter-rules.united-codes.com/rules/G-7170)
- [G-7210: Try to keep your packages small. Include only few procedures and functions that are used in the same context.](https://dblinter-rules.united-codes.com/rules/G-7210)
- [G-7220: Always use forward declaration for private functions and procedures.](https://dblinter-rules.united-codes.com/rules/G-7220)
- [G-7250: Never use RETURN in package initialization block.](https://dblinter-rules.united-codes.com/rules/G-7250)
- [G-7310: Avoid standalone procedures – put your procedures in packages.](https://dblinter-rules.united-codes.com/rules/G-7310)
- [G-7320: Avoid using RETURN statements in a PROCEDURE.](https://dblinter-rules.united-codes.com/rules/G-7320)
- [G-7410: Avoid standalone functions – put your functions in packages.](https://dblinter-rules.united-codes.com/rules/G-7410)
- [G-7420: Always make the RETURN statement the last statement of your function.](https://dblinter-rules.united-codes.com/rules/G-7420)
- [G-7430: Try to use no more than one RETURN statement within a function.](https://dblinter-rules.united-codes.com/rules/G-7430)
- [G-7440: Never use OUT parameters to return values from a function.](https://dblinter-rules.united-codes.com/rules/G-7440)
- [G-7460: Try to define your packaged/standalone function deterministic if appropriate.](https://dblinter-rules.united-codes.com/rules/G-7460)
- [G-7510: Always prefix Oracle supplied packages with owner schema name.](https://dblinter-rules.united-codes.com/rules/G-7510)
- [G-7520: Avoid using deprecated units in your own code.](https://dblinter-rules.united-codes.com/rules/G-7520)
- [G-7710: Avoid cascading triggers.](https://dblinter-rules.united-codes.com/rules/G-7710)
- [G-7730: Avoid multiple DML events per trigger.](https://dblinter-rules.united-codes.com/rules/G-7730)
- [G-7740: Never handle multiple DML events per trigger if primary key is assigned in trigger.](https://dblinter-rules.united-codes.com/rules/G-7740)
- [G-8210: Always use synonyms when accessing objects of another application schema.](https://dblinter-rules.united-codes.com/rules/G-8210/)
- [G-8310: Always validate input parameter size by assigning the parameter to a size limited variable in the declaration section of program unit.](https://dblinter-rules.united-codes.com/rules/G-8310/)
- [G-8410: Always use application locks to ensure a program unit is only running once at a given time.](https://dblinter-rules.united-codes.com/rules/G-8410/)
- [G-8510: Always use dbms_application_info to track program process transiently.](https://dblinter-rules.united-codes.com/rules/G-8510/)
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

Releases of the VS Code extensions are published in the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Grisselbav.dblinter) and the [Open VSX Registry](https://open-vsx.org/extension/Grisselbav/dblinter).

Releases of CLI and SonarQube Plugin will be published on the [Releases page](https://github.com/Grisselbav/dbLinter/releases) of this repository.
