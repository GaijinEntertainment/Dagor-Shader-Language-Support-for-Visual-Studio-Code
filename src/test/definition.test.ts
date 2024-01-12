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

suite('Go to definition in .dshl files', () => {
    test('should go to DSHL macro definitions', async () => {
        await activate(testMacroFileUri);
        await openDocumentAndAssertDefinition(
            testMacroCursorPosition,
            getLocationLink(testMacroDeclaration)
        );
        await openDocumentAndAssertDefinition(
            testMacroStartCursorPosition,
            getLocationLink(testMacroDeclaration)
        );
        await openDocumentAndAssertDefinition(
            testMacroEndCursorPosition,
            getLocationLink(testMacroDeclaration)
        );
        await openDocumentAndAssertDefinition(
            macroWithoutContentCursorPosition,
            getLocationLink(macroWithoutContentDeclaration)
        );
        await openDocumentAndAssertDefinition(
            macroWithParametersCursorPosition,
            getLocationLink(macroWithParametersDeclaration)
        );
        await openDocumentAndAssertDefinition(
            macroWithWrongNumberOfParametersCursorPosition,
            []
        );
        await openDocumentAndAssertDefinition(
            optionalMacroCursorPosition,
            getLocationLink(optionalMacroDeclaration)
        );
        await openDocumentAndAssertDefinition(
            macroWithoutDefinitionCursorPosition,
            []
        );
        await openDocumentAndAssertDefinition(
            strangeMacroCursorPosition,
            getLocationLink(strangeMacroDeclaration)
        );
        await openDocumentAndAssertDefinition(
            macroFromAnotherFileCursorPosition,
            getLocationLink(macroFromAnotherFileDeclaration)
        );
        await openDocumentAndAssertDefinition(emptyPlaceCursorPosition, []);
    });
});

async function openDocumentAndAssertDefinition(
    position: vscode.Position,
    expectedItems: vscode.LocationLink[]
) {
    const actualItems: vscode.LocationLink[] =
        await vscode.commands.executeCommand(
            'vscode.executeDefinitionProvider',
            testMacroFileUri,
            position
        );
    assert.equal(expectedItems.length, actualItems.length);
    expectedItems.forEach((expectedItem, i) => {
        const actualItem = actualItems[i];
        assert.equal(
            expectedItem.targetUri.fsPath,
            actualItem.targetUri.fsPath
        );
        assert.ok(expectedItem.targetRange?.isEqual(actualItem.targetRange!));
        assert.ok(
            expectedItem.targetSelectionRange?.isEqual(
                actualItem.targetSelectionRange!
            )
        );
        assert.equal(
            expectedItem.originSelectionRange,
            actualItem.originSelectionRange
        );
    });
}
