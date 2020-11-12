const path = require('path')
const fs = require('fs')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function generateHtmlPlugins(templateDir) {
	return fs.readdirSync(path.resolve(__dirname, templateDir)).map(item => {
		const [name, extension] = item.split('.')
		const ext = process.env.NODE_ENV == 'production' ? 'php' : 'html'
		return new HtmlWebpackPlugin({
			mobile: true,
			lang: 'es-AR',
			links: [],
			scripts: ['https://maps.googleapis.com/maps/api/js?key=AIzaSyByS6NLFF62OV8j-LCF6BOddLaWtphgkPw'],
			title: 'Espatolero & Lorenzo',
			window: {},
			meta: {
				viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
				'theme-color': '#4285f4'
			},
			filename: `${name}.html`,
			minify: false,
			template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
		})
	})
}

const htmlPlugins = generateHtmlPlugins('../src/templates/views')

module.exports = {
	entry: {
		app: path.resolve(__dirname, '../src/scripts/index.js')
	},
	output: {
		path: path.resolve(process.cwd('..'), 'dist'),
		filename: 'js/main.js'
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: false
		}
	},
	plugins: htmlPlugins.concat([
		new VueLoaderPlugin(),
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: true }),
		new CopyWebpackPlugin({ patterns: [{ from: path.resolve(__dirname, '../public'), to: './' }] })
	]),
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'@': path.resolve(__dirname, '../src'),
			'~': path.resolve(__dirname, '../node_modules')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.(ico|jpg|jpeg|png|webp|svg)(\?.*)?$/,
				include: /images/,
				use: {
					loader: 'file-loader',
					options: {
						esModule: false,
						name: 'images/[name].[ext]'
					}
				}
			},
			{
				test: /\.(eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				exclude: /images/,
				use: {
					loader: 'file-loader',
					options: {
						esModule: false,
						name: 'fonts/[name].[ext]'
					}
				}
			},
			{
				test: /\.pug$/,
				use: {
					loader: 'pug-loader',
					query: { pretty: true }
				}
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto'
			}
		]
	}
}
