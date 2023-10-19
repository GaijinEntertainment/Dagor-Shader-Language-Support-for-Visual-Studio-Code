# How to build, run, test, debug, and package

## Desktop and web extension versions

This repository contains 2 versions of the extension: the desktop version can run in Visual Studio Code, the web version can run in https://github.dev or https://vscode.dev. At the moment the desktop and the web versions have exactly the same features, but in the future, there will be differences (for example the web version won't be able to run the compiler).

## Build, run, and test

1. Download and install Visual Studio Code (<https://code.visualstudio.com/Download>)
2. Download and install Node.js (<https://nodejs.org/en/download>)
3. Download and install git (<https://git-scm.com/downloads>)
4. Open cmd
5. Clone the repository

    ```
    git clone https://github.com/Gaijin-Games-KFT/Dagor-Shader-Language-Support-for-Visual-Studio-Code.git --recursive
    ```

    Don't forget to use the `--recursive` flag otherwise git won't download the Language Server.

6. Go inside the repository's root folder

    ```
    cd Dagor-Shader-Language-Support-for-Visual-Studio-Code
    ```

7. Install dependencies

    ```
    npm install
    ```

8. Go inside the server's folder

    ```
    cd Dagor-Shader-Language-Server
    ```

9. Install the server's dependencies

    ```
    npm install
    ```

10. Go back to the client's folder

    ```
    cd ..
    ```

11. Open the client's folder in Visual Studio Code

    ```
    code .
    ```

    When Visual Studio Code opens, it'll suggest you to install the recommanded extensions. They're all useful, but **TypeScript + Webpack Problem Matchers** is required, without it, you won't be able to run the extension.

12. Run the extension, by pressing F5 or choose between the different options in the **Run and Debug** tab:

-   **Run Desktop Extension**: Builds the desktop extension and runs a new instance of Visual Studio Code where the extension is installed.
-   **Run Web Extension**: Builds the web extension and runs a new instance of Visual Studio Code where the extension is installed. It basically simulates how the extension would run in the browser. If you want to try it in a real browser, use **open-in-browser** instead.
-   **Attach to Server**: Afterr running the **Run Desktop Extension**, this makes debugging possible. For a shorthand, you can use **Debug Desktop Extension** which starts both of them.
-   **Run E2E Tests**: Starts a new Visual Studio Code instance and runs the E2E tests. It doesn't build the extension, so you have to run **build** or **watch** before (or just start the extension with **Run Desktop Extension** or **Run Web Extension**).
-   **Debug Desktop Extension**: Runs both **Run Desktop Extension** and **Attach to Server** and makes debugging possible.
-   **Debug Web Extension**: Runs both **Run Web Extension** and **Attach to Server** and it should make debugging possible. However it doesn't work at the moment, use the desktop version for debugging.

## Package

13. Package the extension

    ```
    npm run package
    ```

    If you add new files which are not required at runtime, add them to the `.vscodeignore` file to keep the package size as low as possible.

## Debug

-   If you want to write something to the console, in the client, just use `console.log`. In the server, use `this.connection.console.log` (actually, if you run the server from Visual Studio Code, `console.log` will work, however, in Visual Studio, only `this.connection.console.log` will work, `console.log` will break the extension).
-   You can use a breakpoint in the client as usual, but if you want to put it into the server, run the extension, using **Debug Desktop Extension**. At the moment breakpoints don't work in the server in the web version.

## Scripts

-   **vscode:prepublish**: Builds both desktop and the web versions of the client and the server in production mode.
-   **build**: Builds both the client and the server in development mode.
-   **watch**: Same as **build**, but it rebuilds the code as you change (and save) a file.
-   **package**: Builds both the extension using **vscode:prepublish** and creates a `.vsix` package, which is deployable.
-   **build-tests**: Builds the E2E tests.
-   **watch-tests**: Same as **build-tests**, but it rebuilds the code as you change (and save) a file.
-   **open-in-browser**: Opens a browser and runs the web version of the extension. Use **build** or **watch** before it.
-   **eslint**: Runs ESLint and lists the possible problems in the code. It has to be succesful to be able to merge a pull request.
-   **prettier-lint**: Prettier checks if all files are formatted correctly. It has to be succesful to be able to merge a pull request.
-   **prettier-format**: Prettier formats all files. Usually not necesary to use it, because files are automatically formatted before commiting.
-   **test**: Runs the E2E tests in the CI pipeline. If you want to run E2E tests locally, use **Run E2E Tests** instead.
-   **prepare**: Automatically runs when you install dependencies to register the formatting pre-commit hook.
