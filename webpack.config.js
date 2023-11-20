/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
//@ts-check
'use strict';
/** @typedef {import('webpack').Configuration} WebpackConfig **/

const path = require('path');
const getServerConfigs = require('./Dagor-Shader-Language-Server/webpack.config.js');

/** @type WebpackConfig */
const clientWebConfig = {
    context: path.join(__dirname),
    mode: 'none',
    target: 'webworker',
    entry: './src/client-web.ts',
    output: {
        filename: 'client-web.js',
        path: path.join(__dirname, 'out'),
        libraryTarget: 'commonjs',
    },
    resolve: {
        mainFields: ['module', 'main'],
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
    externals: {
        vscode: 'commonjs vscode',
    },
    performance: {
        hints: false,
    },
    devtool: 'source-map',
};

/**@type {import('webpack').Configuration}*/
const clientDesktopConfig = {
    context: path.join(__dirname),
    mode: 'development',
    target: 'node',
    entry: './src/client-desktop.ts',
    output: {
        filename: 'client-desktop.js',
        path: path.resolve(__dirname, 'out'),
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
    externals: {
        vscode: 'commonjs vscode',
    },
    devtool: 'source-map',
};

module.exports = (_env, argv) => {
    const [serverDesktopConfig, serverWebConfig] = getServerConfigs(_env, argv);
    return [
        clientDesktopConfig,
        clientWebConfig,
        serverDesktopConfig,
        serverWebConfig,
    ];
};
