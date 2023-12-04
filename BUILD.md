# How to build, run, test, debug, and package

## Desktop and web extension versions

This repository contains 2 versions of the extension: the desktop version can run in Visual Studio Code, the web version can run in https://github.dev or https://vscode.dev. The web version doesn't support document links, because in the browser, VS Code uses virtual workspaces and therefore the language server can't access directly files. The desktop version, in production mode, on x64 architexture, uses on of the the language server's platform-specific executables. In other cases the extension uses Node.js to run the language server.

## Build, run, and test

1.  Download and install Visual Studio Code (<https://code.visualstudio.com/Download>)
2.  Download and install Node.js (<https://nodejs.org/en/download>)
3.  Download and install git (<https://git-scm.com/downloads>)
4.  Download and install OpenJDK (<https://learn.microsoft.com/en-us/java/openjdk/download>)
5.  Open cmd
6.  Clone the repository

    ```
    git clone https://github.com/GaijinEntertainment/Dagor-Shader-Language-Support-for-Visual-Studio-Code.git --recursive
    ```

    Don't forget to use the `--recursive` flag otherwise git won't download the Language Server.

7.  Go inside the repository's root folder

    ```
    cd Dagor-Shader-Language-Support-for-Visual-Studio-Code
    ```

8.  Install dependencies

    ```
    npm install
    ```

9.  Go inside the server's folder

    ```
    cd Dagor-Shader-Language-Server
    ```

10. Install the server's dependencies

    ```
    npm install
    ```

11. Generate code with ANTLR

    ```
    npm run generate-antlr
    ```

    You have to generate code again, every time you change ANTLR grammars in the **Dagor-Shader-Language-Server/grammar/antlr** folder.

12. Go back to the client's folder

    ```
    cd ..
    ```

13. Open the client's folder in Visual Studio Code

    ```
    code .
    ```

    When Visual Studio Code opens, it'll suggest you to install the recommanded extensions. They're all useful, but **TypeScript + Webpack Problem Matchers** is required, without it, you won't be able to run the extension.

14. Run the extension, by pressing F5 or choose between the different options in the **Run and Debug** tab:

-   **Run Desktop Extension**: Builds the desktop extension and runs a new instance of Visual Studio Code where the extension is installed.
-   **Run Web Extension**: Builds the web extension and runs a new instance of Visual Studio Code where the extension is installed. It basically simulates how the extension would run in the browser. If you want to try it in a real browser, use **open-in-browser** instead.
-   **Attach to Server**: Afterr running the **Run Desktop Extension**, this makes debugging possible. For a shorthand, you can use **Debug Desktop Extension** which starts both of them.
-   **Run E2E Tests**: Starts a new Visual Studio Code instance and runs the E2E tests. It doesn't build the extension, so you have to run **build** or **watch** before (or just start the extension with **Run Desktop Extension** or **Run Web Extension**).
-   **Debug Desktop Extension**: Runs both **Run Desktop Extension** and **Attach to Server** and makes debugging possible.
-   **Debug Web Extension**: Runs both **Run Web Extension** and **Attach to Server** and it should make debugging possible. However it doesn't work at the moment, use the desktop version for debugging.

## Package

15. Package the extension

    ```
    npm run package-all
    ```

    or

    ```
    npm run package-<platform>-x64
    ```

    If you add new files which are not required at runtime, add them to all `.vscodeignore` files to keep the package size as low as possible.

## Debug

### TypeScript code

-   If you want to write something to the console, in the client, just use `console.log`. In the server, use `log`, ˛`logInfo`, `logWarning`, or `logError` (actually, if you run the server from Visual Studio Code, `console.log` will work, however, in Visual Studio, `console.log` will break the extension).
-   You can use a breakpoint in the client as usual, but if you want to put it into the server, run the extension, using **Debug Desktop Extension**. At the moment breakpoints don't work in the server in the web version.

### TextMate grammar

-   If you want to know which TextMate rule matched at the cursor, press F1, and select **Developer: Inspect Editor Tokens and Scopes**.
-   If you want to read the steps of the TextMate matching, press F1, and select **Developer: Start Text Mate Syntax Grammar Logging**.

## Scripts

-   **build-production**: Builds both desktop and the web versions of the client and the server in production mode.
-   **build**: Builds both the client and the server in development mode.
-   **watch**: Same as **build**, but it rebuilds the code as you change (and save) a file.
-   **package-universal**: Packages the Universal version of the extension. It doesn't contain platform-specific executable of the language server and therefore it can't run without Node.js. Before running this script, you have to use **build-production**.
-   **package-windows-x64**: Packages the x64 Windows-specific version of the extension. It contains the Windows-specific executable of the language server and therefore it can run without Node.js. Before running this script, you have to use **build-production**.
-   **package-macos-x64**: Packages the x64 Mac-specific version of the extension. It contains the Mac-specific executable of the language server and therefore it can run without Node.js. Before running this script, you have to use **build-production**.
-   **package-linux-x64**: Packages the x64 Linux-specific version of the extension. It contains the Linux-specific executable of the language server and therefore it can run without Node.js. Before running this script, you have to use **build-production**.
-   **package-all**: Packages all versions (Universal, Windows, Mac, Linux) of the extension. The Universal version can't run without Node.js, but the others can. Before running this script, you have to use **build-production**.
-   **build-tests**: Builds the E2E tests.
-   **watch-tests**: Same as **build-tests**, but it rebuilds the code as you change (and save) a file.
-   **open-in-browser**: Opens a browser and runs the web version of the extension. Use **build** or **watch** before it.
-   **eslint**: Runs ESLint and lists the possible problems in the code. It has to be succesful to be able to merge a pull request.
-   **prettier-lint**: Prettier checks if all files are formatted correctly. It has to be succesful to be able to merge a pull request.
-   **prettier-format**: Prettier formats all files. Usually not necesary to use it, because files are automatically formatted before commiting.
-   **test**: Runs the E2E tests in the CI pipeline. If you want to run E2E tests locally, use **Run E2E Tests** instead.
-   **prepare**: Automatically runs when you install dependencies to register the formatting pre-commit hook.
