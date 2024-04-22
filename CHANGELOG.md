# Change Log

## [1.7.0] 2024.04.22.

### Added

-   Code completion (for HLSL variables, structs, enums, classes, and interfaces)
-   Document highlights (for HLSL variables, structs, enums, classes, and interfaces)
-   Hover (for HLSL variables, structs, enums, classes, and interfaces)
-   Document symbols (for HLSL variables, structs, enums, classes, and interfaces)
-   Go to definition (for HLSL variables, structs, enums, classes, and interfaces)
-   Go to declaration (for HLSL variables, structs, enums, classes, and interfaces)
-   Go to implementation (for HLSL structs, enums, classes, and interfaces)
-   Go to type definition (for HLSL variables)

### Improved

-   Adding the parameters to macros and defines in code completion
-   Making document symbol icon selection more robust
-   Updated packages

### Fixed

-   Updating the game selection logic based on the new vscodeconfig
-   Preventing duplicated items in code completion
-   Fixing a formatting bug where line continuation characters caused formatting inside defines

## [1.6.0 Pre-release] 2024.04.15.

### Added

-   Code completion (for HLSL variables)
-   Document highlights (for HLSL variables)
-   Hover (for HLSL variables)
-   Document symbols (for HLSL variables)
-   Go to definition (for HLSL variables)
-   Go to declaration (for HLSL variables)

### Improved

-   Updated packages

### Fixed

-   Fixing a formatting bug where line continuation characters caused formatting inside defines

## [1.5.0] - 2024.04.09.

### Added

-   Diagnostics (only on save at the moment)
-   Code formatting (whole document, range, ranges)

### Improved

-   Migrating includes from document links to go to declaration/definition/implementation
-   Updated packages

### Fixed

-   Fixing an error where certain modifiers' range was used instead of the variable's range

## [1.4.2 Pre-release] 2024.04.05.

### Improved

-   Migrating includes from document links to go to declaration/definition/implementation
-   Updated packages

## [1.4.1 Pre-release] - 2024.03.28.

### Added

-   Diagnostics

### Improved

-   Updated packages

## [1.4.0 Pre-release] - 2024.03.22.

### Added

-   Code formatting (normal, range, ranges)

## [1.3.0] - 2024.03.14.

### Added

-   Code completion (for DSHL variables, shaders, and block statements)
-   Document highlights (for DSHL variables, functions, shaders, and block statements)
-   Hover (for DSHL variables, functions, shaders, and block statements)
-   Document symbols (for DSHL variables, shaders, and block statements)
-   Inlay hints (for DSHL functions)
-   Signature help (for DSHL functions)
-   Go to definition (for DSHL variables, functions, shaders, and block statements)
-   Go to declaration (for DSHL variables, functions, shaders, and block statements)
-   Go to implementation (for DSHL functions, shaders, and block statements)
-   Adding assume and supports code snippets
-   Adding folding ranges based on blocks

### Improved

-   Better type informations in code completion and in document symbols
-   Updated packages
-   Various optimizations

### Fixed

-   Fixing a bug where closing and reopening a file prevented to update the file analyzation
-   Fixing preprocessor directives in one liner hlsl blocks in syntax highlight
-   Fixing macros before loops and ifs in syntax highlight
-   Fixing syntax highlight when #defines contain ##
-   Adding @sampler to the HLSL syntax highlight
-   Using the cleaned content of DSHL macros for expansion instead of the original to get rid of comments
-   Fixing a bug in HLSL macro expansion, where positions were wrong positions were computed

## [1.2.0] - 2024.02.15.

### Added

-   Code completion (for HLSL defines, include statements, DSHL macro parameters)
-   Document highlights (for HLSL defines, DSHL macro parameters)
-   Hover (for HLSL defines)
-   Document symbols (for HLSL defines)
-   Inlay hints (for HLSL defines)
-   Go to definition (for HLSL defines, DSHL macro parameters)
-   Go to declaration (for HLSL defines, DSHL macro parameters)
-   Go to implementation (for HLSL defines)
-   A context menu item to the shader config files to make shader config overriding easier

### Improved

-   Handling multiple declarations for DSHL macros
-   Making DSHL macros hierarchical in the document symbols
-   Adding a link to DSHL macro parameters in inlay hints
-   Various optimizations

### Fixed

-   Fixing an incorrect condition about making the language server executable in Linux and Mac
-   Naming preshaders correctly in snippets
-   Disabling the include links in the web version
-   Providing HLSL code completion instead of DSHL code completion in .hlsli files
-   Adding ##assert to code completion and syntax highlight
-   Adding the missing DSHL modifiers, properties, and functions to the code completion and the syntax highlight, removing unused operators from the syntax highlight
-   Refreshing inlay hints only if it is supported
-   Fixing a bug if there are more DSHL macro arguments than macro parameters
-   Fixing a bug when a DSHL macro appeared multiple times in code completion
-   Preventing unnecessary analyzations, when file is not changed, just opened in the IDE

## [1.1.0] - 2024.01.16.

### Added

-   Code completion (for built-on items, and DSHL macros)
-   Signature help (for DSHL macros)
-   Document highlights (for DSHL macros)
-   Hover (for DSHL macros)
-   Document symbols (for DSHL macros)
-   Inlay hints (for DSHL macros)
-   Go to definition (for DSHL macros)
-   Go to declaration (for DSHL macros)
-   Go to implementation (for DSHL macros)

### Improved

-   HLSL snippets are only provided inside HLSL blocks
-   DSHL snippets are only provided outside HLSL blocks

### Fixed

-   Added missing functions, types and semantics, mostly related to ray-tracing functionality to HLSL syntax highlight
-   Added missing modifiers (optional, global, register) to DSHL syntax highlight
-   Added missing ##assert to HLSL syntax highlight
-   Removed unavailable operators from DSHL syntax highlight
-   Removed assembly-only registers from HLSL syntax highlight
-   Removed the bad indentation after if statements
-   Fixed the misspelled packoffset in HLSL syntax highlight

## [1.0.0] - 2023.12.11.

### Added

-   Syntax highlight
-   Document links
-   Comment toggling
-   Bracket matching
-   Auto closing pairs
-   Surrounding pairs
-   Folding regions
-   Indentation
-   Code snippets
-   File icons
