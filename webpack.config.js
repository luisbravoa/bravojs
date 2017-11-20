const path = require('path');

module.exports = {
    entry: [
        './src/index'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bravo.js',
        libraryTarget: 'umd',
        library: 'bravo'
    },
    devtool: "source-map",
    devServer: {
        publicPath: '/dist/',
        contentBase: path.join(__dirname, '.'),
        open: true,
        openPage: '/sandbox'

    },
};