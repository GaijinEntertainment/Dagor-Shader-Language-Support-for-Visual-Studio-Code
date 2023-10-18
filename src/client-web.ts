import { ExtensionContext, Uri } from 'vscode';

import {
    LanguageClient,
    LanguageClientOptions,
} from 'vscode-languageclient/browser';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
    const serverModule = Uri.joinPath(
        context.extensionUri,
        'Dagor-Shader-Language-Server',
        'out',
        'server-web.js'
    ).toString(true);

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ language: 'dagorsh' }],
    };

    const worker = new Worker(serverModule);

    client = new LanguageClient(
        'dagor-shader-language-support',
        'Dagor Shader Language Support',
        clientOptions,
        worker
    );

    client.start();
}
