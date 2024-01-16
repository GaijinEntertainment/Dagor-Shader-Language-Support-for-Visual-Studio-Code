import * as assert from 'assert';
import * as vscode from 'vscode';

import { activate } from './helper';
import {
    MacroDeclaration,
    macroFromAnotherFileDeclaration,
    macroWithParametersDeclaration,
    macroWithWrongNumberOfParametersDeclaration,
    macroWithoutContentDeclaration,
    optionalMacroDeclaration,
    strangeMacroDeclaration,
    testMacroDeclaration,
    testMacroFileUri,
} from './macro-helper';

suite('Code completion in .dshl files', () => {
    test('shold show the declared DSHL macros', async () => {
        await activate(testMacroFileUri);
        await openDocumentAndAssertCompletionItems(
            testMacroFileUri,
            new vscode.Position(0, 0),
            [],
            getCompletionItems(
                testMacroDeclaration,
                macroWithoutContentDeclaration,
                macroWithParametersDeclaration,
                macroWithWrongNumberOfParametersDeclaration,
                optionalMacroDeclaration,
                strangeMacroDeclaration,
                macroFromAnotherFileDeclaration
            )
        );
        await openDocumentAndAssertCompletionItems(
            testMacroFileUri,
            new vscode.Position(4, 0),
            getCompletionItems(macroFromAnotherFileDeclaration),
            getCompletionItems(
                testMacroDeclaration,
                macroWithoutContentDeclaration,
                macroWithParametersDeclaration,
                macroWithWrongNumberOfParametersDeclaration,
                optionalMacroDeclaration,
                strangeMacroDeclaration
            )
        );
        await openDocumentAndAssertCompletionItems(
            testMacroFileUri,
            new vscode.Position(24, 0),
            getCompletionItems(
                macroFromAnotherFileDeclaration,
                testMacroDeclaration,
                macroWithoutContentDeclaration,
                macroWithParametersDeclaration,
                macroWithWrongNumberOfParametersDeclaration,
                optionalMacroDeclaration
            ),
            getCompletionItems(strangeMacroDeclaration)
        );
    });
});

function getCompletionItems(...mds: MacroDeclaration[]): vscode.CompletionItem[] {
    return mds.map((md) => ({
        label: md.name,
        kind: vscode.CompletionItemKind.Constant,
        detail: `${md.name} - macro`,
    }));
}

async function openDocumentAndAssertCompletionItems(
    uri: vscode.Uri,
    position: vscode.Position,
    expectedItems: vscode.CompletionItem[],
    notExpectedItems: vscode.CompletionItem[]
): Promise<void> {
    const result: vscode.CompletionList = await vscode.commands.executeCommand(
        'vscode.executeCompletionItemProvider',
        uri,
        position
    );
    const actualItems: vscode.CompletionItem[] = result.items;
    expectedItems.forEach((expectedItem) => {
        const actualItem = actualItems.find((ai) => {
            const cil = ai.label as vscode.CompletionItemLabel;
            return cil.label === expectedItem.label;
        });
        assert.ok(actualItem);
        assert.equal(actualItem.kind, expectedItem.kind);
        assert.equal(actualItem.detail, expectedItem.detail);
    });
    notExpectedItems.forEach((notExpectedItem) => {
        const actualItem = actualItems.find((ai) => ai.label === notExpectedItem.label);
        assert.ok(!actualItem);
    });
}
