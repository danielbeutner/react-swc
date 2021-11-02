const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'web.js',
        path: path.resolve(__dirname, 'public'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: "./src/index.html"
        })
    ],
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "swc-loader",
                options: {
                    // This makes swc-loader invoke swc synchronously.
                    sync: true,
                    jsc: {
                        target: 'es2015',
                        parser: {
                            syntax: "typescript",
                            tsx: true,
                            decorators: false,
                            dynamicImport: false,
                        },
                        transform: {
                            react: {
                                pragma: "React.createElement",
                                pragmaFrag: "React.Fragment",
                                throwIfNamespace: true,
                                development: false,
                                useBuiltins: false
                            },
                            optimizer: {
                                globals: {
                                    vars: {
                                        "__DEBUG__": "true"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.ts', '.tsx'],
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000,
    },
};
