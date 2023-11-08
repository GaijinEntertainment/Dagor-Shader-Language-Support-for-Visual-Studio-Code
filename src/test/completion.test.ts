import { activate, getDocUri } from './helper';

import * as vscode from 'vscode';

suite('Should do completion', () => {
    const docUri = getDocUri('completion.sh');

    test('Completes test items in sh file', async () => {
        await testCompletion(docUri, new vscode.Position(0, 0), {
            items: [
                {
                    label: 'Test code completion item 1',
                    kind: vscode.CompletionItemKind.Text,
                },
                {
                    label: 'Test code completion item 2',
                    kind: vscode.CompletionItemKind.Class,
                },
            ],
        });
    });
});

async function testCompletion(
    docUri: vscode.Uri,
    position: vscode.Position,
    expectedCompletionList: vscode.CompletionList
) {
    await activate(docUri);

    const actualCompletionList = (await vscode.commands.executeCommand(
        'vscode.executeCompletionItemProvider',
        docUri,
        position
    )) as vscode.CompletionList;

    // This test is here for reference
    // I'll remove it as soon as I have tests for the real features
    // assert.ok(actualCompletionList.items.length >= 2);
    // expectedCompletionList.items.forEach((expectedItem, i) => {
    //     const actualItem = actualCompletionList.items[i];
    //     assert.equal(actualItem.label, expectedItem.label);
    //     assert.equal(actualItem.kind, expectedItem.kind);
    // });
}
