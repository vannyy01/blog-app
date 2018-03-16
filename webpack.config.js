const path = require('path');

module.exports = {
    entry: './src/index.jsx',

    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'bundle.js',
    },
    resolve: {extensions: [".ts", ".tsx", ".jsx", ".js", ".json"]},
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2016', 'babel-preset-env'],
                    plugins: [
                        ['import', {
                            "libraryName": "antd",
                            "style": true
                        },
                            {
                                "libraryName": "react-toolbox",
                                "style": true
                            },
                            {
                                "libraryName": "semantic-ui-react",
                                "style": true
                            },
                            {
                                "libraryName": "add semantic-ui-css",
                                "style": true
                            },
                        ],
                        ['transform-object-rest-spread'],
                        ['transform-class-properties']
                    ]
                },
                exclude: /(node_modules)/
            },
            {
                test: /\.(scss|sass)$/i,
                use: [
                    'style-loader',
                    'css-loader', // поменять местами с sass-loader
                    'sass-loader', // поменять местами с css-loader
                ]
            },
            {
                test: /\.css$/, loaders:
                    ['style-loader', {
                        loader: "css-loader",
                        options: {
                            modules: true, // default is false
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: "[name]--[local]--[hash:base64:8]"
                        },

                    },
                    ],
            }
            ,

            {
                test: /\.less$/,
                use:
                    [{
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "less-loader" // compiles Less to CSS
                    },
                    ]
            },
            {
                test: /\.(eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash].[ext]",
                            publicPath: "/",
                            outputPath: "assets/font/",
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use:
                    [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                publicPath:  '/',
                                outputPath: 'assets/img/',
                            }
                        },
                        {
                            loader: "image-webpack-loader",
                            options: {
                                bypassOnDebug: false,
                            },
                        },
                    ],
            }
        ]
    },
    devtool: 'source-map',
    devServer:
        {
            contentBase: path.join(__dirname, 'build'),
            compress:
                true,
            port:
                3030,
            historyApiFallback:
                true
        }
    ,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout:
            300,
        poll:
            1000
    }
}