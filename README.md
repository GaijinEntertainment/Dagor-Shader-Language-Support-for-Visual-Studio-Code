# Dagor Shader Language Support

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/gaijin.dagor-shader-language-support?color=44cc11)](https://marketplace.visualstudio.com/items?itemName=gaijin.dagor-shader-language-support)
[![build](https://github.com/GaijinEntertainment/Dagor-Shader-Language-Support-for-Visual-Studio-Code/actions/workflows/build.yml/badge.svg)](https://github.com/GaijinEntertainment/Dagor-Shader-Language-Support-for-Visual-Studio-Code/actions/workflows/build.yml)

Dagor Shader Language Support for Visual Studio Code. If you're not on x64 architecture, you have to install Node.js in order to use the extension.

## Features

### Syntax highlight

![syntax highlight, dark theme](res/screenshots/syntax-highlight-dark.png)

![syntax highlight, light theme](res/screenshots/syntax-highlight-light.png)

### Document links

This feature only works in the desktop version.

![document links](res/screenshots/document-link.gif)

### Comment toggling

![comment toggling](res/screenshots/comment-toggle.gif)

### Bracket matching

![bracket matching](res/screenshots/bracket-match.gif)

### Auto closing pairs

![auto closing pairs](res/screenshots/auto-close.gif)

### Surrounding pairs

![surrounding pairs](res/screenshots/surround.gif)

### Folding regions

![folding regions](res/screenshots/folding-region.gif)

### Indentation

![indentation](res/screenshots/indentation.gif)

### Code snippets

![code snippets](res/screenshots/snippets.gif)

### File icons

![file icons](res/screenshots/icons.png)

## Configuration

-   `dagorShaderLanguageServer.shaderConfigOverride`: Shader configs are .blk files, usually located in the games' `prog/shaders` folders, and they determine include folders. For example: `samples/testGI/prog/shaders/shaders_dx12.blk`. If you want to override the extension's automatic shader config selection, provide the shader config's path here. Leaving it empty enables the automatic selection based on game, platform, and driver in launch options.

## Issues

If you have any problems or feature request for the extension, feel free to create an issue.

## Release Notes

For more information, see the [changelog](CHANGELOG.md).

### 1.0.0

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
