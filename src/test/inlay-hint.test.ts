import * as assert from 'assert';
import * as vscode from 'vscode';

import { activate } from './helper';
import {
    MacroUsage,
    macroWithParametersUsage,
    strangeMacroUsage,
    testMacroFileUri,
} from './macro-helper';

suite('Inlay hints in .dshl files', () => {
    test('should show inlay hints for DSHL macro arguments', async () => {
        await activate(testMacroFileUri);
        await openDocumentAndAssertInlayHints([
            ...getInlayHints(macroWithParametersUsage),
            ...getInlayHints(strangeMacroUsage),
        ]);
    });
});

function getInlayHints(mu: MacroUsage): vscode.InlayHint[] {
    return mu.parameters.map((mp) => ({
        label: `${mp.name}:`,
        position: mp.position,
        kind: vscode.InlayHintKind.Parameter,
        paddingRight: true,
    }));
}

async function openDocumentAndAssertInlayHints(
    expectedItems: vscode.InlayHint[]
) {
    const wholeFileRange = new vscode.Range(0, 0, 36, 0);
    const actualItems: vscode.InlayHint[] =
        await vscode.commands.executeCommand(
            'vscode.executeInlayHintProvider',
            testMacroFileUri,
            wholeFileRange
        );
    assert.equal(expectedItems.length, actualItems.length);
    expectedItems.forEach((expectedItem, i) => {
        const actualItem = actualItems[i];
        assert.equal(expectedItem.label, actualItem.label);
        assert.ok(expectedItem.position?.isEqual(actualItem.position!));
        assert.equal(expectedItem.kind, actualItem.kind);
        assert.equal(expectedItem.paddingLeft, actualItem.paddingLeft);
        assert.equal(expectedItem.paddingRight, actualItem.paddingRight);
    });
}
