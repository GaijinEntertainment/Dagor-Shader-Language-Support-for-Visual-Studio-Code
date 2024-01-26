import { ExtensionContext, ExtensionMode, Uri, commands, window, workspace } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

import {
    COMMAND_ID_SET_SHADER_CONFIG,
    CONFIGURATION_ID_SHADER_CONFIG_OVERRIDE,
    EXTENSION_ID,
    EXTENSION_NAME,
    LANGUAGE_SERVER_ID,
} from './constant';

import * as fsp from 'fs/promises';
import * as os from 'os';
import * as path from 'path';

let client: LanguageClient;

export async function activate(context: ExtensionContext): Promise<void> {
    addCommands(context);
    startServer(context);
}

export function deactivate(): Thenable<void> | undefined {
    return client?.stop();
}

function addCommands(context: ExtensionContext): void {
    context.subscriptions.push(
        commands.registerCommand(COMMAND_ID_SET_SHADER_CONFIG, async (uri: Uri) => {
            await workspace
                .getConfiguration(LANGUAGE_SERVER_ID)
                .update(CONFIGURATION_ID_SHADER_CONFIG_OVERRIDE, workspace.asRelativePath(uri));
            await window.showInformationMessage('Shader config override changed');
        })
    );
}

async function startServer(context: ExtensionContext): Promise<void> {
    const serverOptions = await getServerOptions(context);
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ language: 'dshl' }, { language: 'hlsl' }],
    };
    client = new LanguageClient(EXTENSION_ID, EXTENSION_NAME, serverOptions, clientOptions);

    client.start();
}

async function getServerOptions(context: ExtensionContext): Promise<ServerOptions> {
    if (context.extensionMode === ExtensionMode.Production && isExecutableAvailable()) {
        const executablePath = getExecutablePath(context);
        const executable = await makeFileExecutableIfNeeded(executablePath);
        if (executable) {
            return { command: executablePath, args: ['--stdio'] };
        }
    }
    return getNodeJsServerOptions(context);
}

function isExecutableAvailable(): boolean {
    return (
        (os.platform() === 'win32' || os.platform() === 'linux' || os.platform() === 'darwin') && os.arch() === 'x64'
    );
}

function getExecutablePath(context: ExtensionContext): string {
    const fileName = getExecutableFileName();
    return context.asAbsolutePath(path.join('Dagor-Shader-Language-Server', 'bin', fileName));
}

function getExecutableFileName(): string {
    switch (os.platform()) {
        case 'win32':
            return 'server-desktop-win.exe';
        case 'linux':
            return 'server-desktop-linux';
        case 'darwin':
            return 'server-desktop-macos';
        default:
            throw new Error('Unsupported platform');
    }
}

async function makeFileExecutableIfNeeded(file: string): Promise<boolean> {
    if (os.platform() === 'win32') {
        return true;
    }
    try {
        await fsp.access(file, fsp.constants.X_OK);
        return true;
    } catch (e1) {
        // file is not executable
        try {
            await fsp.chmod(file, 0o755);
            return true;
        } catch (e2) {
            // can't make file executable
            return false;
        }
    }
}

function getNodeJsServerOptions(context: ExtensionContext): ServerOptions {
    const serverModule = context.asAbsolutePath(path.join('Dagor-Shader-Language-Server', 'out', 'server-desktop.js'));
    return {
        run: {
            module: serverModule,
            transport: TransportKind.ipc,
        },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: { execArgv: ['--nolazy', '--inspect=6009'] },
        },
    };
}
