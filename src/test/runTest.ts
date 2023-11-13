import { runTests } from '@vscode/test-electron';

import * as path from 'path';

async function main(): Promise<void> {
    try {
        console.log(__dirname);
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');
        const extensionTestsPath = path.resolve(__dirname, './index');
        const workspacePath = path.resolve(__dirname, '../../testFixture');
        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            launchArgs: [workspacePath],
        });
    } catch (err) {
        console.error('Failed to run tests');
        process.exit(1);
    }
}

main();
