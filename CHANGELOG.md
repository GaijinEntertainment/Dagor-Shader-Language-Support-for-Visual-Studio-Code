# Change Log

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
