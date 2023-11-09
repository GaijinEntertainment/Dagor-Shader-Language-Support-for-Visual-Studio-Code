import * as path from 'path';
import * as vscode from 'vscode';

export let document: vscode.TextDocument;
export let editor: vscode.TextEditor;
export let documentEol: string;
export let platformEol: string;

export async function activate(uri: vscode.Uri): Promise<void> {
    const extension = vscode.extensions.getExtension(
        'gaijin.dagor-shader-language-support'
    )!;
    const languageId = uri.path.endsWith('.sh') ? 'dagorsh' : 'hlsl';
    await extension.activate();
    try {
        document = await vscode.workspace.openTextDocument(uri);
        vscode.languages.setTextDocumentLanguage(document, languageId);
        editor = await vscode.window.showTextDocument(document);
        await sleep(2000);
    } catch (e) {
        console.error(e);
    }
}

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getDocumentPath = (filePath: string) => {
    return path.resolve(__dirname, '../../testFixture', filePath);
};

export const getDocumentUri = (filePath: string) => {
    return vscode.Uri.file(getDocumentPath(filePath));
};

export function getRange(
    startLine: number,
    startCharacter: number,
    endLine: number,
    endCharacter: number
): vscode.Range {
    const start = new vscode.Position(startLine, startCharacter);
    const end = new vscode.Position(endLine, endCharacter);
    return new vscode.Range(start, end);
}

export function getDocumenLink(range: vscode.Range): vscode.DocumentLink {
    return new vscode.DocumentLink(range);
}
