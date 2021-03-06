const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack')
const { styles } = require('@ckeditor/ckeditor5-dev-utils')

const resolve = path.resolve.bind(path, __dirname)

if (!process.env.API_URI) {
	throw new Error('Environment variable API_URI not set')
}
const dev = process.env.NODE_ENV === 'develop'
const publicPath = process.env.STATIC_URL || '/'
module.exports = ({ sourceDir, distDir }) => ({
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom'
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		plugins: [
			new TsconfigPathsPlugin({
				configFile: './tsconfig.json'
			})
		]
	},
	entry: {
		dashboard: `${sourceDir}/[categorySlug].tsx`
	},
	output: {
		path: distDir,
		publicPath: publicPath
	},
	devtool: 'source-map',
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					experimentalWatchApi: true,
					transpileOnly: true
				}
			},
			{
				test: /\.(woff2?|ttf|eot)$/,
				include: [resolve('node_modules'), resolve('assets/fonts')],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
							publicPath: '/fonts/'
						}
					}
				]
			},
			{
				test: /\.(gif|jpg|png|svg)$/,
				exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
				// include: [
				//   resolve("node_modules"),
				//   resolve("assets/images"),
				//   resolve("assets/favicons")
				// ],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash].[ext]',
							outputPath: 'images/',
							publicPath: dev ? '/images/' : '/dashboard/images/'
						}
					}
					// {
					//   loader: "image-webpack-loader",
					//   options: {
					//     mozjpeg: {
					//       progressive: true,
					//       quality: 85,
					//     },
					//     pngquant: {
					//       quality: [0.65, 0.90],
					//       speed: 4,
					//     },
					//     optipng: {
					//       enabled: false,
					//     },
					//     gifsicle: {
					//       enabled: false,
					//     },
					//   },
					// },
				]
			},
			{
				test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,

				use: ['raw-loader']
			},
			{
				test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag',
							attributes: {
								'data-cke': true
							}
						}
					},
					{
						loader: 'postcss-loader',
						options: styles.getPostCssConfig({
							themeImporter: {
								themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
							},
							minify: true
						})
					}
				]
			}
			// {
			//
			//   test: /\.svg$/,
			//   loader: 'svg-inline-loader',
			//   include: [
			//     resolve("node_modules"),
			//     resolve("assets/images"),
			//     resolve("assets/favicons")
			//   ]
			// },
		]
	},
	plugins: [
		new CleanWebpackPlugin({
			// dry: isDev,
			cleanOnceBeforeBuildPatterns: distDir
		}),
		new HtmlWebpackPlugin({
			filename: `${distDir}/index.html`,
			hash: true,
			template: `${sourceDir}/index.html`
		}),
		new ForkTsCheckerWebpackPlugin({
			// tslint: true,
			// exclude: "node_modules",
			async: false
		}),
		// PWA plugins
		new FaviconsWebpackPlugin({
			logo: `${sourceDir}/images/favicon.png`,
			prefix: 'assets/favicons/',
			mode: 'webapp', // optional can be 'webapp' or 'light' - 'webapp' by default
			devMode: 'webapp'
		}),
		new webpack.EnvironmentPlugin(['APP_MOUNT_URI', 'API_URI'])
	],
	node: {
		fs: 'empty',
		module: 'empty'
	}
})
