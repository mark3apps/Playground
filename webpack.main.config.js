const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
    /**
     * This is the main entry point for your application, it's the first file
     * that runs in the main process.
     */
    entry: './src/index.ts',
    // Put your normal webpack config below here
    module: {
        rules: require('./webpack.rules'),
    },
    plugins: [new NodePolyfillPlugin()],
    resolve: {
        fallback: {
            fs: false,
            tls: false,
            net: false,
            path: false,
            zlib: false,
            http: false,
            https: false,
            stream: false,
            crypto: false,
            'crypto-browserify': require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    },
    stats: {
        errors: true,
        errorStack: true,
        errorDetails: true, // --display-error-details
    },
}
