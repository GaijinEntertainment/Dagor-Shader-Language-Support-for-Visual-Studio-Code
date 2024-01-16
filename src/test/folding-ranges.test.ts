import * as assert from 'assert';
import * as vscode from 'vscode';

import { activate } from './helper';
import {
    MacroDeclaration,
    macroWithParametersDeclaration,
    macroWithWrongNumberOfParametersDeclaration,
    macroWithoutContentDeclaration,
    optionalMacroDeclaration,
    strangeMacroDeclaration,
    testMacroDeclaration,
    testMacroFileUri,
} from './macro-helper';

// TODO: re-enable this test when the provider finds all ranges
suite.skip('Folding ranges in .dshl files', () => {
    test('should create folding ranges for the DSHL macro declarations', async () => {
        await activate(testMacroFileUri);
        await openDocumentAndAssertFolding([
            getFoldingRange(testMacroDeclaration),
            getFoldingRange(macroWithoutContentDeclaration),
            getFoldingRange(macroWithParametersDeclaration),
            getFoldingRange(macroWithWrongNumberOfParametersDeclaration),
            getFoldingRange(optionalMacroDeclaration),
            getFoldingRange(strangeMacroDeclaration),
        ]);
    });
});

function getFoldingRange(md: MacroDeclaration): vscode.FoldingRange {
    return {
        kind: vscode.FoldingRangeKind.Region,
        start: md.range.start.line,
        end: md.range.end.line,
    };
}

async function openDocumentAndAssertFolding(expectedItems: vscode.FoldingRange[]): Promise<void> {
    const actualItems: vscode.FoldingRange[] = await vscode.commands.executeCommand(
        'vscode.executeFoldingRangeProvider',
        testMacroFileUri
    );
    assert.equal(expectedItems.length, actualItems.length);
    expectedItems.forEach((expectedItem, i) => {
        const actualItem = actualItems[i];
        assert.equal(expectedItem.kind, actualItem.kind);
        assert.equal(expectedItem.start, actualItem.start);
        assert.equal(expectedItem.end, actualItem.end);
    });
}
