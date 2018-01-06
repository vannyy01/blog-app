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
                    presets: ['react', 'es2015'],
                    plugins: [
                        ['import', {
                            "libraryName": "antd",
                            "style": true
                        }]
                    ]
                },
                exclude: /(node_modules)/
            },
            {test: /\.css$/, loaders: ['style-loader', 'css-loader']},
            {test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]}
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 3030,
        historyApiFallback: false
    }
}