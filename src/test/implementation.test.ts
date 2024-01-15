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

suite('Go to implementation in .dshl files', () => {
    test('should go to DSHL macro implementation', async () => {
        await activate(testMacroFileUri);
        await openDocumentAndAssertImplementation(
            testMacroCursorPosition,
            getLocationLink(testMacroDeclaration)
        );
        await openDocumentAndAssertImplementation(
            testMacroStartCursorPosition,
            getLocationLink(testMacroDeclaration)
        );
        await openDocumentAndAssertImplementation(
            testMacroEndCursorPosition,
            getLocationLink(testMacroDeclaration)
        );
        await openDocumentAndAssertImplementation(
            macroWithoutContentCursorPosition,
            getLocationLink(macroWithoutContentDeclaration)
        );
        await openDocumentAndAssertImplementation(
            macroWithParametersCursorPosition,
            getLocationLink(macroWithParametersDeclaration)
        );
        await openDocumentAndAssertImplementation(
            macroWithWrongNumberOfParametersCursorPosition,
            getLocationLink(macroWithWrongNumberOfParametersDeclaration)
        );
        await openDocumentAndAssertImplementation(
            optionalMacroCursorPosition,
            getLocationLink(optionalMacroDeclaration)
        );
        await openDocumentAndAssertImplementation(
            macroWithoutDefinitionCursorPosition,
            []
        );
        await openDocumentAndAssertImplementation(
            strangeMacroCursorPosition,
            getLocationLink(strangeMacroDeclaration)
        );
        await openDocumentAndAssertImplementation(
            macroFromAnotherFileCursorPosition,
            getLocationLink(macroFromAnotherFileDeclaration)
        );
        await openDocumentAndAssertImplementation(emptyPlaceCursorPosition, []);
    });
});

async function openDocumentAndAssertImplementation(
    position: vscode.Position,
    expectedItems: vscode.LocationLink[]
): Promise<void> {
    const actualItems: vscode.LocationLink[] =
        await vscode.commands.executeCommand(
            'vscode.executeImplementationProvider',
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
