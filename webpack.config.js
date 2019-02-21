/**
 * @link https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1
 */

// sets mode webpack runs under
const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require( 'path' );
const webpack = require('webpack'); // Access built-in plugins such as new webpack.optimize.UglifyJsPlugin()
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );

const inProduction = ('production' === process.env.NODE_ENV);

module.exports = {
	mode: NODE_ENV,

	externals: {
		lodash: 'lodash',
		$: 'jQuery',
		jquery: 'jQuery',
		react: 'React',
		'react-dom': 'ReactDOM',
		// 'wp.i18n': '@wordpress/i18n',
		// 'wp.blocks': {
		// 	window: [ 'wp', 'blocks' ],
		// },
		// 'wp.compose': '@wordpress/compose',
		// 'wp.data': '@wordpress/data',
		// 'wp.date': '@wordpress/date',
		// 'wp.editor': '@wordpress/editor',
		// 'wp.element': '@wordpress/element',
		// 'wp.utils': '@wordpress/utils',
	},

	// entry is the source script.
	entry: {
		index: './src/block.js'
	},

	// output is where to write the build files.
	output: {
		path: path.resolve( __dirname, './dist/' ),
		filename: '[name].js',
		// library: ['wp', '[name]'],
		// libraryTarget: 'window',
	},
	devtool: 'source-map', // Generate the source map files.
	module: {
		// the list of rules used to process files
		// this looks for .js files, exclude files
		// in node_modules directory, and uses the
		// babel-loader to process
		rules: [
			{
				test: /.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},

			// SASS to CSS
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader:  'style-loader',
						options: {
							sourceMap: true
						}
					},
					MiniCssExtractPlugin.loader,
					{
						loader:  'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader:  'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader:  'sass-loader',
						options: {
							sourceMap:   true,
							outputStyle: (inProduction ? 'compressed' : 'nested')
						},
					},
				]
			},

			// Images.
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]',
							publicPath: '../'
						}
					}
				]
			}

		],
	},

	plugins: [

		// Removes the "dist" folder before building.
		new CleanWebpackPlugin( [ 'dist' ] ),

		// new ExtractTextPlugin( 'css/[name].css' ),
		new MiniCssExtractPlugin( {
			filename: `css/styles.css`
		}),
	],
	stats: {
		children: false
	},
};
