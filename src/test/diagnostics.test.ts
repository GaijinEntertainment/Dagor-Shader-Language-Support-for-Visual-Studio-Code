import { activate, getDocUri } from './helper';

import * as vscode from 'vscode';

suite('Should get diagnostics', () => {
    const docUri = getDocUri('diagnostics.sh');

    test('Diagnoses uppercase texts', async () => {
        await testDiagnostics(docUri, [
            {
                message: 'ASD is all uppercase.',
                range: toRange(0, 0, 0, 3),
                severity: vscode.DiagnosticSeverity.Warning,
                source: 'ex',
            },
        ]);
    });
});

function toRange(sLine: number, sChar: number, eLine: number, eChar: number) {
    const start = new vscode.Position(sLine, sChar);
    const end = new vscode.Position(eLine, eChar);
    return new vscode.Range(start, end);
}

async function testDiagnostics(
    docUri: vscode.Uri,
    expectedDiagnostics: vscode.Diagnostic[]
) {
    await activate(docUri);

    const actualDiagnostics = vscode.languages.getDiagnostics(docUri);

    // This test is here for reference
    // I'll remove it as soon as I have tests for the real features
    // assert.equal(actualDiagnostics.length, expectedDiagnostics.length);

    // expectedDiagnostics.forEach((expectedDiagnostic, i) => {
    //     const actualDiagnostic = actualDiagnostics[i];
    //     assert.equal(actualDiagnostic.message, expectedDiagnostic.message);
    //     assert.deepEqual(actualDiagnostic.range, expectedDiagnostic.range);
    //     assert.equal(actualDiagnostic.severity, expectedDiagnostic.severity);
    // });
}
