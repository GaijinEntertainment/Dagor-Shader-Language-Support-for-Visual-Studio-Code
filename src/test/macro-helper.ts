import * as vscode from 'vscode';
import { getDocumentUri } from './helper';

export type MacroDeclaration = {
    name: string;
    parametersList: string;
    range: vscode.Range;
    nameRange: vscode.Range;
    uri: vscode.Uri;
};

export type MacroUsage = {
    name: string;
    header: string;
    parameters: MacroArgument[];
    nameRange: vscode.Range;
};

export type MacroArgument = {
    name: string;
    position: vscode.Position;
};

export const testMacroFileUri = getDocumentUri('dshl_macro_test_game/prog/shaders/test.dshl');

export const testMacroDeclaration: MacroDeclaration = {
    name: 'TEST_MACRO',
    parametersList: '()',
    range: new vscode.Range(5, 0, 7, 8),
    nameRange: new vscode.Range(5, 6, 5, 16),
    uri: testMacroFileUri,
};
export const testMacroUsage: MacroUsage = {
    name: 'TEST_MACRO',
    header: 'macro TEST_MACRO()',
    parameters: [],
    nameRange: new vscode.Range(27, 0, 27, 10),
};
export const testMacroCursorPosition = new vscode.Position(27, 4);
export const testMacroStartCursorPosition = new vscode.Position(27, 0);
export const testMacroEndCursorPosition = new vscode.Position(27, 10);
export const testMacroDeclarationCursorPosition = new vscode.Position(5, 10);

export const macroWithoutContentDeclaration: MacroDeclaration = {
    name: 'MACRO_WITHOUT_CONTENT',
    parametersList: '()',
    range: new vscode.Range(9, 0, 10, 8),
    nameRange: new vscode.Range(9, 6, 9, 27),
    uri: testMacroFileUri,
};
export const macroWithoutContentUsage: MacroUsage = {
    name: 'MACRO_WITHOUT_CONTENT',
    header: 'macro MACRO_WITHOUT_CONTENT()',
    parameters: [],
    nameRange: new vscode.Range(28, 0, 28, 21),
};
export const macroWithoutContentCursorPosition = new vscode.Position(28, 18);

export const macroWithParametersDeclaration: MacroDeclaration = {
    name: 'MACRO_WITH_PARAMETERS',
    parametersList: '(a, b, c)',
    range: new vscode.Range(12, 0, 14, 8),
    nameRange: new vscode.Range(12, 6, 12, 27),
    uri: testMacroFileUri,
};
export const macroWithParametersUsage: MacroUsage = {
    name: 'MACRO_WITH_PARAMETERS',
    header: 'macro MACRO_WITH_PARAMETERS(a, b, c)',
    parameters: [
        { name: 'a', position: new vscode.Position(29, 22) },
        { name: 'b', position: new vscode.Position(29, 25) },
        { name: 'c', position: new vscode.Position(29, 28) },
    ],
    nameRange: new vscode.Range(29, 0, 29, 21),
};
export const macroWithParametersCursorPosition = new vscode.Position(29, 2);

export const macroWithWrongNumberOfParametersDeclaration: MacroDeclaration = {
    name: 'MACRO_WITH_WRONG_NUMBER_OF_PARAMETERS',
    parametersList: '(a)',
    range: new vscode.Range(16, 0, 18, 8),
    nameRange: new vscode.Range(16, 6, 16, 43),
    uri: testMacroFileUri,
};
export const macroWithWrongNumberOfParametersUsage: MacroUsage = {
    name: 'MACRO_WITH_WRONG_NUMBER_OF_PARAMETERS',
    header: 'macro MACRO_WITH_WRONG_NUMBER_OF_PARAMETERS(a)',
    parameters: [],
    nameRange: new vscode.Range(30, 0, 30, 37),
};
export const macroWithWrongNumberOfParametersCursorPosition = new vscode.Position(30, 10);

export const optionalMacroDeclaration: MacroDeclaration = {
    name: 'OPTIONAL_MACRO',
    parametersList: '()',
    range: new vscode.Range(20, 0, 22, 8),
    nameRange: new vscode.Range(20, 28, 20, 42),
    uri: testMacroFileUri,
};
export const optionalMacroUsage: MacroUsage = {
    name: 'OPTIONAL_MACRO',
    header: 'define_macro_if_not_defined OPTIONAL_MACRO()',
    parameters: [],
    nameRange: new vscode.Range(31, 0, 31, 14),
};
export const optionalMacroCursorPosition = new vscode.Position(31, 6);

export const macroWithoutDefinitionUsage: MacroUsage = {
    name: 'MACRO_WITHOUT_DEFINITION',
    header: '',
    parameters: [],
    nameRange: new vscode.Range(32, 0, 32, 24),
};
export const macroWithoutDefinitionCursorPosition = new vscode.Position(32, 9);

export const strangeMacroDeclaration: MacroDeclaration = {
    name: 'STRANGE_MACRO',
    parametersList: '(a, b, c)',
    range: new vscode.Range(24, 2, 25, 8),
    nameRange: new vscode.Range(24, 11, 24, 24),
    uri: testMacroFileUri,
};
export const strangeMacroUsage: MacroUsage = {
    name: 'STRANGE_MACRO',
    header: 'macro STRANGE_MACRO(a, b, c)',
    parameters: [
        { name: 'a', position: new vscode.Position(33, 16) },
        { name: 'b', position: new vscode.Position(33, 20) },
        { name: 'c', position: new vscode.Position(33, 22) },
    ],
    nameRange: new vscode.Range(33, 0, 33, 13),
};
export const strangeMacroCursorPosition = new vscode.Position(33, 9);

export const macroFromAnotherFileDeclaration: MacroDeclaration = {
    name: 'MACRO_FROM_ANOTHER_FILE',
    parametersList: '()',
    range: new vscode.Range(0, 0, 2, 8),
    nameRange: new vscode.Range(0, 6, 0, 29),
    uri: getDocumentUri('dshl_macro_test_game/prog/shaders/test_2.dshl'),
};
export const macroFromAnotherFileUsage: MacroUsage = {
    name: 'MACRO_FROM_ANOTHER_FILE',
    header: 'macro MACRO_FROM_ANOTHER_FILE()',
    parameters: [],
    nameRange: new vscode.Range(34, 0, 34, 23),
};
export const macroFromAnotherFileCursorPosition = new vscode.Position(34, 15);

export const emptyPlaceCursorPosition = new vscode.Position(35, 0);

export function getLocationLink(md: MacroDeclaration): vscode.LocationLink[] {
    return [
        {
            targetUri: md.uri,
            targetRange: md.range,
            targetSelectionRange: md.nameRange,
        },
    ];
}
