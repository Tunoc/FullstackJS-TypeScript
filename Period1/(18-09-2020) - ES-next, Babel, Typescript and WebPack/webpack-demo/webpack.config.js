const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        // filename: 'main.js',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                // https://github.com/tcoopman/image-webpack-loader
                // https://webpack.js.org/loaders/url-loader/ 
                // Logical next step would have been minifying and optimizing the images
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
};