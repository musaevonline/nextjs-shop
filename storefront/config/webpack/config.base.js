const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");

if (!process.env.API_URI) {
  throw new Error("Environment variable API_URI not set");
}
const isDev = process.env.NODE_ENV === 'develop';
module.exports = ({ sourceDir, distDir }) => ({
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json",
      }),
    ],
  },
  entry: {
    app: `${sourceDir}/index.tsx`,
  },
  output: {
    path: distDir,
    publicPath: "/",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          experimentalWatchApi: true,
          transpileOnly: true,
        },
      },
      {
        test: /\.(woff2?|ttf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
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
              outputPath: "images/",
              publicPath: "/images/",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 85,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                enabled: false,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      // dry: isDev,
      cleanOnceBeforeBuildPatterns: distDir,
    }),
    new HtmlWebpackPlugin({
      filename: `${distDir}/index.html`,
      template: `${sourceDir}/index.html`,
    }),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      exclude: "node_modules",
      async: false,
    }),
    // PWA plugins
    new FaviconsWebpackPlugin({
      logo: `${sourceDir}/images/favicon.png`,
      prefix: 'images/favicons/',
      mode: 'webapp', // optional can be 'webapp' or 'light' - 'webapp' by default
      devMode: 'webapp',
    }),
    new webpack.EnvironmentPlugin({
      API_URI: process.env.API_URI,
      SERVICE_WORKER_TIMEOUT: "60000",
    }),
  ],
  node: {
    fs: "empty",
    module: "empty",
  },
});