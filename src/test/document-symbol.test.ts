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

suite('Document symbols in .dshl files', () => {
    test('should find DSHL macro declarations', async () => {
        await activate(testMacroFileUri);
        await openDocumentAndAssertDocumentSymbols([
            getDocumentSymbol(testMacroDeclaration),
            getDocumentSymbol(macroWithoutContentDeclaration),
            getDocumentSymbol(macroWithParametersDeclaration),
            getDocumentSymbol(macroWithWrongNumberOfParametersDeclaration),
            getDocumentSymbol(optionalMacroDeclaration),
            getDocumentSymbol(strangeMacroDeclaration),
        ]);
    });
});

function getDocumentSymbol(md: MacroDeclaration): vscode.DocumentSymbol {
    return {
        name: md.name,
        kind: vscode.SymbolKind.Constant,
        range: md.range,
        selectionRange: md.nameRange,
        detail: md.parametersList,
        children: [],
    };
}

async function openDocumentAndAssertDocumentSymbols(
    expectedItems: vscode.DocumentSymbol[]
) {
    const actualItems: vscode.DocumentSymbol[] =
        await vscode.commands.executeCommand(
            'vscode.executeDocumentSymbolProvider',
            testMacroFileUri
        );
    assert.equal(expectedItems.length, actualItems.length);
    expectedItems.forEach((expectedItem, i) => {
        const actualItem = actualItems[i];
        assert.equal(expectedItem.name, actualItem.name);
        assert.equal(expectedItem.kind, actualItem.kind);
        assert.ok(expectedItem.range?.isEqual(actualItem.range!));
        assert.ok(
            expectedItem.selectionRange?.isEqual(actualItem.selectionRange!)
        );
        assert.equal(expectedItem.detail, actualItem.detail);
    });
}
