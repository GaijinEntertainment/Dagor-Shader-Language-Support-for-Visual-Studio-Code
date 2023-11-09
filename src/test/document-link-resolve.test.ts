import { activate, getDocumentUri } from './helper';

import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';

suite('Document link resolve', () => {
    const shadersFolder = 'include_test_game/prog/shaders';

    test('should find the included files, based on the include folders in .sh files', async () => {
        const uri = getDocumentUri(`${shadersFolder}/test.sh`);
        await openDocumentAndAssertLinks(uri, [
            'folder_2/test_inc_3.hlsl', //  #include "test_inc_3.hlsl"
            'test_inc_1.hlsl', //           #include "test_inc_1.hlsl"
            'folder_1/test_inc_1.hlsl', //  #include <test_inc_1.hlsl>
            'test_inc_1.hlsl', //           #include <../test_inc_1.hlsl>
            'folder_1/test_inc_1.sh', //    include "test_inc_1.sh"
            'folder_2/test_inc_3.sh', //    include "test_inc_3.sh"
        ]);
    });

    test('should find the included files, based on the include folders in .hlsl files', async () => {
        const uri = getDocumentUri(`${shadersFolder}/test.hlsl`);
        await openDocumentAndAssertLinks(uri, [
            'folder_2/test_inc_3.hlsl', //  #include "test_inc_3.hlsl"
            'test_inc_1.hlsl', //           #include "test_inc_1.hlsl"
            'folder_1/test_inc_1.hlsl', //  #include <test_inc_1.hlsl>
            'test_inc_1.hlsl', //           #include <../test_inc_1.hlsl>
        ]);
    });
});

async function openDocumentAndAssertLinks(
    uri: vscode.Uri,
    expectedLinks: string[]
) {
    await activate(uri);
    const actualLinks: vscode.DocumentLink[] =
        await vscode.commands.executeCommand(
            'vscode.executeLinkProvider',
            uri,
            expectedLinks.length
        );

    assert.ok(actualLinks.length === expectedLinks.length);
    expectedLinks.forEach((expectedLink, i) => {
        const actualItem = path.normalize(actualLinks[i].target?.path ?? '');
        const expectedItem = path.normalize(
            `include_test_game/prog/shaders/${expectedLink}`
        );
        assert.ok(actualItem.endsWith(expectedItem));
    });
}
