import { activate, getDocumentUri } from './helper';

import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';

const shadersFolder = 'include_test_game/prog/shaders';

suite('Document link resolve include directives in .sh files', () => {
    test('should find the included files, based on the include folders', async () => {
        const uri = getDocumentUri(`${shadersFolder}/test.sh`);
        await openDocumentAndAssertLinks(uri, [
            'folder_2/test_inc_3.hlsl', //  #include "test_inc_3.hlsl"
            'test_inc_1.hlsl', //           #include "test_inc_1.hlsl"
            'folder_1/test_inc_1.hlsl', //  #include <test_inc_1.hlsl>
            'test_inc_1.hlsl', //           #include <../test_inc_1.hlsl>
            'folder_1/test_inc_1.sh', //    include "test_inc_1.sh"
            'folder_2/test_inc_3.sh', //    include "test_inc_3.sh"
            'folder_1/test_inc_2.sh', //    include_optional "test_inc_2.sh"
        ]);
    });
});

suite('Document link resolve include directives in .hlsl files', () => {
    test('should find the included files, based on the include folders', async () => {
        const uri = getDocumentUri(`${shadersFolder}/test.hlsl`);
        await openDocumentAndAssertLinks(uri, [
            'folder_2/test_inc_3.hlsl', //  #include "test_inc_3.hlsl"
            'test_inc_1.hlsl', //           #include "test_inc_1.hlsl"
            'folder_1/test_inc_1.hlsl', //  #include <test_inc_1.hlsl>
            'test_inc_1.hlsl', //           #include <../test_inc_1.hlsl>
        ]);
    });
});

suite('Document link resolve override include directives in .sh files', () => {
    test('should find the included files, based on the override include folders', async () => {
        await setShaderConfigOverride(`${shadersFolder}/shaders_other.blk`);

        const uri = getDocumentUri(`${shadersFolder}/test.sh`);
        await openDocumentAndAssertLinks(uri, [
            'folder_2/test_inc_3.hlsl', //  #include "test_inc_3.hlsl"
            'test_inc_1.hlsl', //           #include "test_inc_1.hlsl"
            'test_inc_1.hlsl', //           #include <test_inc_1.hlsl>
            'test_inc_1.hlsl', //           #include <../test_inc_1.hlsl>
            'test_inc_1.sh', //             include "test_inc_1.sh"
            'folder_2/test_inc_3.sh', //    include "test_inc_3.sh"
            'test_inc_2.sh', //             include_optional "test_inc_2.sh"
        ]);

        await setShaderConfigOverride('');
    });
});

suite('Document link resolve include directives in .hlsl files', () => {
    test('should find the included files, based on the include folders', async () => {
        await setShaderConfigOverride(`${shadersFolder}/shaders_other.blk`);

        const uri = getDocumentUri(`${shadersFolder}/test.hlsl`);
        await openDocumentAndAssertLinks(uri, [
            'folder_2/test_inc_3.hlsl', //  #include "test_inc_3.hlsl"
            'test_inc_1.hlsl', //           #include "test_inc_1.hlsl"
            'test_inc_1.hlsl', //           #include <test_inc_1.hlsl>
            'test_inc_1.hlsl', //           #include <../test_inc_1.hlsl>
        ]);

        await setShaderConfigOverride('');
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
        const expectedItem = path.normalize(`${shadersFolder}/${expectedLink}`);
        assert.ok(actualItem.endsWith(expectedItem));
    });
}

async function setShaderConfigOverride(value: string): Promise<void> {
    await vscode.workspace
        .getConfiguration('dagorShaderLanguageServer')
        .update('shaderConfigOverride', value);
}
