import * as assert from 'assert';
import * as vscode from 'vscode';

import { activate } from './helper';
import {
    MacroDeclaration,
    MacroUsage,
    emptyPlaceCursorPosition,
    macroFromAnotherFileCursorPosition,
    macroFromAnotherFileUsage,
    macroWithParametersCursorPosition,
    macroWithParametersDeclaration,
    macroWithParametersUsage,
    macroWithWrongNumberOfParametersCursorPosition,
    macroWithWrongNumberOfParametersDeclaration,
    macroWithWrongNumberOfParametersUsage,
    macroWithoutContentCursorPosition,
    macroWithoutContentDeclaration,
    macroWithoutContentUsage,
    macroWithoutDefinitionCursorPosition,
    optionalMacroCursorPosition,
    optionalMacroDeclaration,
    optionalMacroUsage,
    strangeMacroCursorPosition,
    strangeMacroDeclaration,
    strangeMacroUsage,
    testMacroCursorPosition,
    testMacroDeclaration,
    testMacroDeclarationCursorPosition,
    testMacroEndCursorPosition,
    testMacroFileUri,
    testMacroStartCursorPosition,
    testMacroUsage,
} from './macro-helper';

suite('Document highlights in .dshl files', () => {
    test('should highlight the DSHL macros', async () => {
        await activate(testMacroFileUri);
        await openDocumentAndAssertHighlights(
            testMacroCursorPosition,
            getDocumentHighlights(testMacroUsage, testMacroDeclaration)
        );
        await openDocumentAndAssertHighlights(
            testMacroStartCursorPosition,
            getDocumentHighlights(testMacroUsage, testMacroDeclaration)
        );
        await openDocumentAndAssertHighlights(
            testMacroEndCursorPosition,
            getDocumentHighlights(testMacroUsage, testMacroDeclaration)
        );
        await openDocumentAndAssertHighlights(
            testMacroDeclarationCursorPosition,
            getDocumentHighlights(testMacroUsage, testMacroDeclaration)
        );
        await openDocumentAndAssertHighlights(
            macroWithoutContentCursorPosition,
            getDocumentHighlights(
                macroWithoutContentUsage,
                macroWithoutContentDeclaration
            )
        );
        await openDocumentAndAssertHighlights(
            macroWithParametersCursorPosition,
            getDocumentHighlights(
                macroWithParametersUsage,
                macroWithParametersDeclaration
            )
        );
        await openDocumentAndAssertHighlights(
            macroWithWrongNumberOfParametersCursorPosition,
            getDocumentHighlights(
                macroWithWrongNumberOfParametersUsage,
                macroWithWrongNumberOfParametersDeclaration
            )
        );
        await openDocumentAndAssertHighlights(
            optionalMacroCursorPosition,
            getDocumentHighlights(optionalMacroUsage, optionalMacroDeclaration)
        );
        await openDocumentAndAssertHighlights(
            macroWithoutDefinitionCursorPosition,
            []
        );
        await openDocumentAndAssertHighlights(
            strangeMacroCursorPosition,
            getDocumentHighlights(strangeMacroUsage, strangeMacroDeclaration)
        );
        await openDocumentAndAssertHighlights(
            macroFromAnotherFileCursorPosition,
            getDocumentHighlights(macroFromAnotherFileUsage)
        );
        await openDocumentAndAssertHighlights(emptyPlaceCursorPosition, []);
    });
});

function getDocumentHighlights(
    mu: MacroUsage,
    md?: MacroDeclaration
): vscode.DocumentHighlight[] {
    const result: vscode.DocumentHighlight[] = [];
    if (md) {
        result.push({
            kind: vscode.DocumentHighlightKind.Text,
            range: md.nameRange,
        });
    }
    result.push({
        kind: vscode.DocumentHighlightKind.Text,
        range: mu.nameRange,
    });
    return result;
}

async function openDocumentAndAssertHighlights(
    position: vscode.Position,
    expectedItems: vscode.DocumentHighlight[]
): Promise<void> {
    const actualItems: vscode.DocumentHighlight[] =
        await vscode.commands.executeCommand(
            'vscode.executeDocumentHighlights',
            testMacroFileUri,
            position
        );
    assert.equal(expectedItems.length, actualItems?.length ?? 0);
    expectedItems.forEach((expectedItem, i) => {
        const actualItem = actualItems[i];
        assert.equal(expectedItem.kind, actualItem.kind);
        assert.ok(expectedItem.range?.isEqual(actualItem.range!));
    });
}
