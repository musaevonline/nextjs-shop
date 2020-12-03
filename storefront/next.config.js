const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const path = require('path');
const webpack = require("webpack");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const HotModulePlugin = require("webpack").HotModuleReplacementPlugin;

const resolve = path.resolve.bind(path, __dirname);
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const mode = isProd ? 'production' : 'development';
const sourceDir = path.join(__dirname, "./src");
const distDir = path.join(__dirname, "./dist");

const plugins = (isServer)=>{
  const base = [
    new webpack.ProgressPlugin(),
    // cleanWebpackPlugin,
    !isServer &&
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: "write-references",
      },
      eslint: {
        files: `./src/**/*.{ts,tsx,js,jsx}`
      },
      async: false,
    }),
    new FaviconsWebpackPlugin({
      logo: `${sourceDir}/images/favicon.svg`,
      prefix: 'images/favicons/',
      mode: 'webapp',
      devMode: 'webapp'
    }),
    new webpack.EnvironmentPlugin(['API_URI', 'DASHBOARD_URL', 'GTM_ID']),
    new LodashModuleReplacementPlugin({
      chaining: true
    })
  ].filter(Boolean);
  if (isDev){
    base.push(new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }));
    // base.push(new HotModulePlugin())
  }
  if(isProd){
    base.push(new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }));
    base.push(new OptimizeCssAssetsPlugin());
    base.push(new TerserPlugin());
  }
  // if (isProd){
  // base.push(new BundleAnalyzerPlugin());
  // base.push(new HotModulePlugin());
  // }
  return base;
};



module.exports = withPlugins(
    [[optimizedImages, { handleImages: ["jpeg", "png", "webp", "gif", "jpg", "svg"] }],
      // [withCSS, {cssModules: true}],
    ],
    {
      // distDir: 'dist',
      trailingSlash: true,

      webpack: (config, {isServer}) => {
        config.mode = mode;
        // config.devtool = "source-map";
        config.node = {
          fs: "empty",
          module: "empty",
        };
        const configWebpack = {
          resolve: {
            alias: {
              ...config.resolve.alias,
              "react-dom": "@hot-loader/react-dom",
            },
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            plugins: [
              new TsconfigPathsPlugin({
                configFile: "./tsconfig.json",
              }),
            ],
          },
          module: {
            rules: [
              !isServer && {
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                  experimentalWatchApi: true,
                  transpileOnly: true,
                },
                test: /\.tsx?$/,
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
                    loader: "file-loader",
                    options: {
                      name: "[name].[ext]",
                      outputPath: "/_next/static/fonts/",
                      publicPath: "/fonts/",
                    },
                  },
                ],
              },
              {
                test: /\.(gif|jpg|png|svg)$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      name: "[name].[ext]",
                      publicPath: "/_next/static/images/",
                      outputPath: "/images/",
                    },
                  },
                ],
              },
              isDev && {
                test: /\.(scss|css)$/,
                use: [
                  isServer ? MiniCssExtractPlugin.loader : "style-loader",
                  {
                    loader: "css-loader",
                    options: { sourceMap: true }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      sourceMap: true,
                      postcssOptions: {
                        plugins: ["tailwindcss", "autoprefixer"]
                      }
                    }
                  },
                  { loader: "sass-loader" }
                ]
              },
              isProd && {
                test: /\.(scss|css)$/,
                use: [
                  isServer ? MiniCssExtractPlugin.loader : "style-loader",
                  {
                    loader: "css-loader",
                    options: { sourceMap: true }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      'sourceMap': true,
                      postcssOptions: {
                        plugins: ["tailwindcss", "autoprefixer"]
                      }
                    }
                  },
                  { loader: "sass-loader" }
                ]
              }
              // {
              //   test: /\.(scss|css)$/,
              //   use: [
              //     {
              //       loader: isServer ? MiniCssExtractPlugin.loader : "style-loader",
              //     },
              //     {
              //       loader: 'css-loader',
              //       options: {sourceMap: true}
              //     },
              //
              //     {
              //       loader: 'postcss-loader',
              //       options: {
              //         sourceMap: true,
              //         postcssOptions: {
              //           plugins: ['tailwindcss', 'autoprefixer']
              //         }
              //       }
              //     },
              //     'sass-loader'
              //
              //   ],
              // }
            ].filter(Boolean)
          },
          plugins: [...config.plugins, ...plugins(isServer)].filter(Boolean)
        };
        return {...config, ...configWebpack}
      }
    }
);
