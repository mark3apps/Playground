const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

rules.push({
    test: /\.css$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
})

module.exports = {
    module: {
        rules,
    },
    plugins: plugins,
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
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    },
}
