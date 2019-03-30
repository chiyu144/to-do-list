const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const shortid = require('shortid');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
	template: path.join(__dirname, 'dist/index.html'),
	filename: './index.html'
});

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
  module: {
    rules: [
		{
			test: /\.js$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react']
				}
			}
		},
		{
			test:/\.css$/,
			use:[
				"style-loader",
				"css-loader"
			]
		},
		{
			test: /\.(png|jpg|gif|svg)$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 8192
					}
				}
			]
		}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
    })
  ],
	resolve: {
			extensions: ['.js', '.jsx']
	},
	devServer: {
			port: 5500
	}
};