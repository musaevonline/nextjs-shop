const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const resolve = path.resolve.bind(path, __dirname)
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const mode = isProd ? 'production' : 'development'
const sourceDir = path.join(__dirname, './src')
const distDir = path.join(__dirname, './dist')

const plugins = (isServer) => {
	const base = [
		new webpack.ProgressPlugin(),
		// cleanWebpackPlugin,
		!isServer &&
			new ForkTsCheckerWebpackPlugin({
				typescript: {
					mode: 'write-references'
				},
				eslint: {
					files: `./src/**/*.{ts,tsx,js,jsx}`
				},
				async: false
			}),
		new FaviconsWebpackPlugin({
			logo: `${sourceDir}/images/favicon.svg`,
			prefix: '_next/static/images/favicons/',
			outputPath: 'static/images/favicons/',
			mode: 'webapp',
			devMode: 'webapp',
			inject: true,
			favicons: {
				appDescription: 'Stroyluxdrev'
			}
		}),
		new webpack.EnvironmentPlugin({
			API_URI: 'http://localhost:8000/graphql/',
			DASHBOARD_URL: 'http://localhost:9000/dashboard/',
			STOREFRONT_URL: 'http://localhost:3000/',
			SSR_API_URL: 'http://api:8000/graphql/',
			GTM_ID: 'GTM-WSNK82H'
		}),
		new LodashModuleReplacementPlugin({
			chaining: true
		})
	].filter(Boolean)
	if (isDev) {
		base.push(
			new MiniCssExtractPlugin({
				filename: 'static/css/[name].css',
				chunkFilename: 'static/css/[id].css'
			})
		)
		// base.push(new HotModulePlugin())
	}
	if (isProd) {
		base.push(
			new MiniCssExtractPlugin({
				filename: 'static/css/bundle-[contenthash].css',
				chunkFilename: 'static/css/bundle-[contenthash].css'
			})
		)
		base.push(new OptimizeCssAssetsPlugin())
		base.push(new TerserPlugin())
	}
	// if (isProd){
	// base.push(new BundleAnalyzerPlugin());
	// base.push(new HotModulePlugin());
	// }
	return base
}

module.exports = withPlugins(
	[
		// [
		// 	optimizedImages,
		// 	{ handleImages: ['jpeg', 'png', 'webp', 'gif', 'jpg', 'svg'] }
		// ]
		// [withCSS, {cssModules: true}],
		[withImages, { inlineImageLimit: false }]
	],
	{
		// distDir: 'dist',
		trailingSlash: true,
		images: {
			domains: ['localhost', 'stroyluxdrev.by'],
			deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
			imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
		},
		webpack: (config, { isServer }) => {
			config.mode = mode
			// config.devtool = "source-map";
			config.node = {
				fs: 'empty',
				module: 'empty'
			}
			const configWebpack = {
				resolve: {
					alias: {
						...config.resolve.alias,
						'react-dom': '@hot-loader/react-dom'
					},
					extensions: ['.ts', '.tsx', '.js', '.jsx'],
					plugins: [
						new TsconfigPathsPlugin({
							configFile: './tsconfig.json'
						})
					]
				},
				module: {
					rules: [
						!isServer && {
							exclude: /node_modules/,
							loader: 'ts-loader',
							options: {
								experimentalWatchApi: true,
								transpileOnly: true
							},
							test: /\.tsx?$/
						},
						...config.module.rules,
						{
							test: /\.js$/,
							exclude: /node_modules/,
							loader: 'babel-loader'
						},
						{
							test: /\.(woff2?|ttf|eot|woff)$/,
							use: [
								{
									loader: 'file-loader',
									options: {
										name: '[name].[ext]',
										outputPath: '/_next/static/fonts/',
										publicPath: '/fonts/'
									}
								}
							]
						},
						isDev && {
							test: /\.(scss|css)$/,
							use: [
								MiniCssExtractPlugin.loader,
								{
									loader: 'css-loader',
									options: { sourceMap: true }
								},
								{
									loader: 'postcss-loader',
									options: {
										sourceMap: true,
										postcssOptions: {
											plugins: ['tailwindcss', 'autoprefixer']
										}
									}
								},
								{ loader: 'sass-loader' }
							]
						},
						isProd && {
							test: /\.(scss|css)$/,
							use: [
								MiniCssExtractPlugin.loader,
								{
									loader: 'css-loader',
									options: { sourceMap: true }
								},
								{
									loader: 'postcss-loader',
									options: {
										sourceMap: true,
										postcssOptions: {
											plugins: ['tailwindcss', 'autoprefixer']
										}
									}
								},
								{ loader: 'sass-loader' }
							]
						}
					].filter(Boolean)
				},
				plugins: [...config.plugins, ...plugins(isServer)].filter(Boolean)
			}
			return { ...config, ...configWebpack }
		}
	}
)
