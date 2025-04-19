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

## Components

The dbLinter suite consists of the following components:

| Component                                                     | Description                                                                                             |
|---------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| Web-GUI                                                       | Managing tenant-specific data, like rules, configurations, user access.                                 |
| VS Code Extensions                                            | Checking and fixing SQL files while editing. Running SQL-based tests.                                   |
| CLI                                                           | Running checks and SQL-based tests from the command line producing output for 3rd party tools.          |
| SonarQube Plugin                                              | Running checks via SonarScanner with integration into SonarQube's repository with all its features.     |
| [Static Rules Site](https://dblinter-rules.united-codes.com/) | Generated, static website with all public rules. Rules are referenced in problems panel within VS Code. |

## Releases

Releases of all downloadable components will be published on the [Releases page](https://github.com/Grisselbav/dbLinter/releases).
