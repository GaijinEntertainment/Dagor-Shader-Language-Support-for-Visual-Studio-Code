import { activate, getDocUri } from './helper';

import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Should find includes', () => {
    const docUri = getDocUri('include_test.sh');

    test('Find Dagor Shader include', async () => {
        await testIncludes(docUri, [
            {
                range: toRange(0, 9, 0, 16),
                target: undefined,
                tooltip: undefined,
            },
        ]);
    });
});

function toRange(sLine: number, sChar: number, eLine: number, eChar: number) {
    const start = new vscode.Position(sLine, sChar);
    const end = new vscode.Position(eLine, eChar);
    return new vscode.Range(start, end);
}

async function testIncludes(
    docUri: vscode.Uri,
    expectedLinks: vscode.DocumentLink[]
) {
    await activate(docUri);

    const actualLinks = (await vscode.commands.executeCommand(
        'vscode.executeLinkProvider',
        docUri
    )) as vscode.DocumentLink[];

    assert.ok(actualLinks.length === 1);
    expectedLinks.forEach((expectedItem, i) => {
        const actualItem = actualLinks[i];
        assert.deepEqual(actualItem.range, expectedItem.range);
        assert.equal(actualItem.target, expectedItem.target);
        assert.equal(actualItem.tooltip, expectedItem.tooltip);
    });
}
