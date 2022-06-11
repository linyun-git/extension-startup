const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "development",
  devtool: 'source-map',
	entry: {
		content: path.resolve(__dirname, "src", "content"),
		devtools: path.resolve(__dirname, "src", "devtools"),
		popup: path.resolve(__dirname, "src", "popup"),
		sandbox: path.resolve(__dirname, "src", "sandbox"),
		'service-worker': path.resolve(__dirname, "src", "service-worker"),
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js",
	},
	resolve: {
		extensions: [".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, 'tsconfig.json'),
      }),
    ],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
    new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [{from: "manifest.json", to: ".", context: "public"}]
		}),
    new HtmlWebpackPlugin({
      filename: 'devtools.html',
      template: 'public/devtools.html',
      chunks: ['devtools'],
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'public/popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      filename: 'sandbox.html',
      template: 'public/sandbox.html',
      chunks: ['sandbox'],
    }),
	],
};
