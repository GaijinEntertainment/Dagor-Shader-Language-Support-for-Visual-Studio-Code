import { ExtensionContext, Uri } from 'vscode';
import {
    LanguageClient,
    LanguageClientOptions,
} from 'vscode-languageclient/browser';

import { EXTENSION_ID, EXTENSION_NAME } from './constant';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
    const serverModule = Uri.joinPath(
        context.extensionUri,
        'Dagor-Shader-Language-Server',
        'out',
        'server-web.js'
    ).toString(true);

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ language: 'dshl' }, { language: 'hlsl' }],
    };

    const worker = new Worker(serverModule);

    client = new LanguageClient(
        EXTENSION_ID,
        EXTENSION_NAME,
        clientOptions,
        worker
    );

    client.start();
}
