const path = require('path');

module.exports = {
    entry: './src/index.jsx',

    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'bundle.js'
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
                                "libraryName": "material-ui",
                                "style": true
                            },
                            {
                                "libraryName": "material-ui-chip-input",
                                "style": true
                            }
                        ],
                        ['transform-object-rest-spread'],
                        ['transform-class-properties']
                    ]
                },
                exclude: /(node_modules)/
            },
            {
                test: /\.css$/, loaders: ['style-loader', {
                    loader: "css-loader",
                    options: {
                        modules: true, // default is false
                        sourceMap: true,
                        importLoaders: 1,
                        localIdentName: "[name]--[local]--[hash:base64:8]"
                    },

                },
                ],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {loader: "file-loader"},
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
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 3030,
        historyApiFallback: true
    }
}