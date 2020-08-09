// 基于node的  适用common.js规范

let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
let Webpack = require('webpack');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
let TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: process.env.ENV === 'production'?'production':'development',    // 更改模式
    entry: './src/index.js',
    // entry: ['./src/1.js','./src/2.js'],
    output: {
        filename: 'build.[hash:8].js',
        path: path.resolve('./build')
    },
    devServer: {
        contentBase: './build', // 基于什么文件夹起服务
        port: 3000,
        compress: true,
        hot: true
    },
    optimization: {
        minimize: true,
        splitChunks: {
            maxSize: 1000, // 超过3k字节就分块
        },
        minimizer:[
            new UglifyjsWebpackPlugin({ // 这个插件需要在webpack Mode='production'时生效
                uglifyOptions: {
                    output: {
                        comments: false
                    },
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true
                    }
                },
                sourceMap: false
            })
        ]
        // minimizer: [
        //     // new TerserWebpackPlugin({
        //     //     sourceMap: false,
        //     //     parallel: true,
        //     //     terserOptions: {
        //     //         compress: {
        //     //             pure_funcs: ["console.log"]
        //     //         },
        //     //         output: {
        //     //             comments: false
        //     //         }
        //     //     },
        //     //     extractComments: false,
        //     // }),
        //     // new UglifyjsWebpackPlugin({
        //     //     test: /\.js$/,
        //     //     uglifyOptions: {
        //     //         warnings: false,
        //     //         compress: {
        //     //             drop_console: true,
        //     //             // pure_funcs: ["console.log"]
        //     //         },
        //     //         output: {
        //     //             comments: false
        //     //         },
        //     //         sourceMap: false,   // 去除打包后生产的map文件
        //     //         parallel: true,
        //     //     }
        //     // })
        // ]
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: 'webpack的html title',
            hash: true, // 引入文件时后面接的etag
            // minify: {
                //     removeAttributeQuotes: true,
                //     collapseWhitespace: true
                // }
            }),
        // new ExtractTextWebpackPlugin({
        //     filename: 'css/index.css'
        // }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new CopyWebpackPlugin([
            { 
                from: path.join(__dirname, '/static'),
                to: path.join(__dirname, '/build/static/')
            }
        ]),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true,
                },
                canPrint: true
            }
        }),
    ],
    module: {
        rules:[
            {
                test: /\.css$/,
                // use: ExtractTextWebpackPlugin.extract({
                //     use: [
                //         // {
                //         //     loader: 'style-loader'
                //         // },
                //         {
                //             loader: 'css-loader'
                //         },
                //     ]
                // })
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
}