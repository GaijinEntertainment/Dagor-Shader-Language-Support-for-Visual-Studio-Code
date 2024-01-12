import * as assert from 'assert';
import * as vscode from 'vscode';

import { activate } from './helper';
import {
    MacroUsage,
    emptyPlaceCursorPosition,
    macroWithParametersUsage,
    testMacroCursorPosition,
    testMacroFileUri,
} from './macro-helper';

suite('Signature help in .dshl files', () => {
    test('should show signature help for DSHL macro arguments', async () => {
        await activate(testMacroFileUri);
        await openDocumentAndAssertSignatureHelp(
            getSignatureHelp(macroWithParametersUsage, 0),
            new vscode.Position(29, 22)
        );
        await openDocumentAndAssertSignatureHelp(
            getSignatureHelp(macroWithParametersUsage, 0),
            new vscode.Position(29, 23)
        );
        await openDocumentAndAssertSignatureHelp(
            getSignatureHelp(macroWithParametersUsage, 1),
            new vscode.Position(29, 24)
        );
        await openDocumentAndAssertSignatureHelp(
            getSignatureHelp(macroWithParametersUsage, 1),
            new vscode.Position(29, 25)
        );
        await openDocumentAndAssertSignatureHelp(
            getSignatureHelp(macroWithParametersUsage, 1),
            new vscode.Position(29, 26)
        );
        await openDocumentAndAssertSignatureHelp(null, testMacroCursorPosition);
        await openDocumentAndAssertSignatureHelp(
            null,
            emptyPlaceCursorPosition
        );
    });
});

function getSignatureHelp(
    mu: MacroUsage,
    activeParameter: number
): vscode.SignatureHelp {
    return {
        activeParameter,
        activeSignature: 0,
        signatures: [
            {
                label: mu.header,
                parameters: mu.parameters.map((p) => ({
                    label: p.name,
                })),
            },
        ],
    };
}

async function openDocumentAndAssertSignatureHelp(
    expectedItem: vscode.SignatureHelp | null,
    position: vscode.Position
): Promise<void> {
    const actualItem: vscode.SignatureHelp =
        await vscode.commands.executeCommand(
            'vscode.executeSignatureHelpProvider',
            testMacroFileUri,
            position
        );
    if (!expectedItem) {
        assert.equal(expectedItem, actualItem);
        return;
    }
    assert.equal(expectedItem.activeParameter, actualItem.activeParameter);
    assert.equal(expectedItem.activeSignature, actualItem.activeSignature);
    assert.equal(expectedItem.signatures.length, actualItem.signatures.length);
    expectedItem.signatures.forEach((expectedSignature, i) => {
        const actualSignature = actualItem.signatures[i];
        assert.equal(expectedSignature.label, actualSignature.label);
        expectedSignature.parameters.forEach((expectedParameter, j) => {
            const actualParameter = actualSignature.parameters[j];
            assert.equal(expectedParameter.label, actualParameter.label);
        });
    });
}
