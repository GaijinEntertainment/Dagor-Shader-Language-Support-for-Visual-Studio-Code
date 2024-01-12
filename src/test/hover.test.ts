import * as assert from 'assert';
import * as vscode from 'vscode';

import { activate } from './helper';
import {
    MacroUsage,
    emptyPlaceCursorPosition,
    macroFromAnotherFileCursorPosition,
    macroFromAnotherFileUsage,
    macroWithParametersCursorPosition,
    macroWithParametersUsage,
    macroWithWrongNumberOfParametersCursorPosition,
    macroWithoutContentCursorPosition,
    macroWithoutContentUsage,
    macroWithoutDefinitionCursorPosition,
    optionalMacroCursorPosition,
    optionalMacroUsage,
    strangeMacroCursorPosition,
    strangeMacroUsage,
    testMacroCursorPosition,
    testMacroEndCursorPosition,
    testMacroFileUri,
    testMacroStartCursorPosition,
    testMacroUsage,
} from './macro-helper';

suite('Hover in .dshl files', () => {
    test('should display hover over DSHL macro calls', async () => {
        await activate(testMacroFileUri);
        await openDocumentAndAssertHovers(
            testMacroCursorPosition,
            getHover(testMacroUsage)
        );
        await openDocumentAndAssertHovers(
            testMacroStartCursorPosition,
            getHover(testMacroUsage)
        );
        await openDocumentAndAssertHovers(
            testMacroEndCursorPosition,
            getHover(testMacroUsage)
        );
        await openDocumentAndAssertHovers(
            macroWithoutContentCursorPosition,
            getHover(macroWithoutContentUsage)
        );
        await openDocumentAndAssertHovers(
            macroWithParametersCursorPosition,
            getHover(macroWithParametersUsage)
        );
        await openDocumentAndAssertHovers(
            macroWithWrongNumberOfParametersCursorPosition,
            []
        );
        await openDocumentAndAssertHovers(
            optionalMacroCursorPosition,
            getHover(optionalMacroUsage)
        );
        await openDocumentAndAssertHovers(
            macroWithoutDefinitionCursorPosition,
            []
        );
        await openDocumentAndAssertHovers(
            strangeMacroCursorPosition,
            getHover(strangeMacroUsage)
        );
        await openDocumentAndAssertHovers(
            macroFromAnotherFileCursorPosition,
            getHover(macroFromAnotherFileUsage)
        );
        await openDocumentAndAssertHovers(emptyPlaceCursorPosition, []);
    });
});

function getHover(mu: MacroUsage): vscode.Hover[] {
    return [
        {
            contents: getHoverContents(mu.header),
            range: mu.nameRange,
        },
    ];
}

function getHoverContents(macro: string): vscode.MarkedString[] {
    return [{ value: `\`\`\`dshl\n${macro}\n\`\`\``, language: 'dshl' }];
}

async function openDocumentAndAssertHovers(
    position: vscode.Position,
    expectedItems: vscode.Hover[]
) {
    const actualItems: vscode.Hover[] = await vscode.commands.executeCommand(
        'vscode.executeHoverProvider',
        testMacroFileUri,
        position
    );
    assert.equal(expectedItems.length, actualItems.length);
    expectedItems.forEach((expectedItem, i) => {
        const actualItem = actualItems[i];
        assert.equal(
            expectedItem.contents[0]['value'],
            actualItem.contents[0]['value']
        );
        assert.ok(expectedItem.range?.isEqual(actualItem.range!));
    });
}
