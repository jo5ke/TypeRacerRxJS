var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "style.bundle.css",
});
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
    mode: 'development',
    entry: ['./js/main.js', './scss/style.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    watch: true,
    module: {
        rules: [{
            test: /\.(scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins() {
                            return [
                                precss,
                                autoprefixer
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader'
                }]
            })
        }, ]
    },
    plugins: [
        extractSass
    ],
    stats: {
        children: false
    }
};