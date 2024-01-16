import * as assert from 'assert';
import * as vscode from 'vscode';

import { activate } from './helper';
import {
    emptyPlaceCursorPosition,
    getLocationLink,
    macroFromAnotherFileCursorPosition,
    macroFromAnotherFileDeclaration,
    macroWithParametersCursorPosition,
    macroWithParametersDeclaration,
    macroWithWrongNumberOfParametersCursorPosition,
    macroWithWrongNumberOfParametersDeclaration,
    macroWithoutContentCursorPosition,
    macroWithoutContentDeclaration,
    macroWithoutDefinitionCursorPosition,
    optionalMacroCursorPosition,
    optionalMacroDeclaration,
    strangeMacroCursorPosition,
    strangeMacroDeclaration,
    testMacroCursorPosition,
    testMacroDeclaration,
    testMacroEndCursorPosition,
    testMacroFileUri,
    testMacroStartCursorPosition,
} from './macro-helper';

suite('Go to declaration in .dshl files', () => {
    test('should go to DSHL macro declarations', async () => {
        await activate(testMacroFileUri);
        await openDocumentAndAssertDeclaration(testMacroCursorPosition, getLocationLink(testMacroDeclaration));
        await openDocumentAndAssertDeclaration(testMacroStartCursorPosition, getLocationLink(testMacroDeclaration));
        await openDocumentAndAssertDeclaration(testMacroEndCursorPosition, getLocationLink(testMacroDeclaration));
        await openDocumentAndAssertDeclaration(
            macroWithoutContentCursorPosition,
            getLocationLink(macroWithoutContentDeclaration)
        );
        await openDocumentAndAssertDeclaration(
            macroWithParametersCursorPosition,
            getLocationLink(macroWithParametersDeclaration)
        );
        await openDocumentAndAssertDeclaration(
            macroWithWrongNumberOfParametersCursorPosition,
            getLocationLink(macroWithWrongNumberOfParametersDeclaration)
        );
        await openDocumentAndAssertDeclaration(optionalMacroCursorPosition, getLocationLink(optionalMacroDeclaration));
        await openDocumentAndAssertDeclaration(macroWithoutDefinitionCursorPosition, []);
        await openDocumentAndAssertDeclaration(strangeMacroCursorPosition, getLocationLink(strangeMacroDeclaration));
        await openDocumentAndAssertDeclaration(
            macroFromAnotherFileCursorPosition,
            getLocationLink(macroFromAnotherFileDeclaration)
        );
        await openDocumentAndAssertDeclaration(emptyPlaceCursorPosition, []);
    });
});

async function openDocumentAndAssertDeclaration(
    position: vscode.Position,
    expectedItems: vscode.LocationLink[]
): Promise<void> {
    const actualItems: vscode.LocationLink[] = await vscode.commands.executeCommand(
        'vscode.executeDeclarationProvider',
        testMacroFileUri,
        position
    );
    assert.equal(expectedItems.length, actualItems.length);
    expectedItems.forEach((expectedItem, i) => {
        const actualItem = actualItems[i];
        assert.equal(expectedItem.targetUri.fsPath, actualItem.targetUri.fsPath);
        assert.ok(expectedItem.targetRange?.isEqual(actualItem.targetRange!));
        assert.ok(expectedItem.targetSelectionRange?.isEqual(actualItem.targetSelectionRange!));
        assert.equal(expectedItem.originSelectionRange, actualItem.originSelectionRange);
    });
}
