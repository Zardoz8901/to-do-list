const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const WriteFilesPlugin = require('write-file-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/index.ts',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true,
        open: {
            app: {
                name: 'Google Chrome',
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new WriteFilesPlugin(),
        new HtmlWebpackHarddiskPlugin(),
        new HtmlWebpackPlugin({
            title: 'Restaurant Page',
            alwaysWriteToDisk: true,
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        runtimeChunk: 'single',
    },
};
