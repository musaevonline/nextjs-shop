const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HotModulePlugin = require("webpack").HotModuleReplacementPlugin;
const webpack = require('webpack');

module.exports = ({ sourceDir, distDir }) => {

  return {
    watch: true,
    watchOptions: {
      aggregateTimeout: 200,
      poll: 500,
      ignored: /node_modules/
    },
    output: {
      filename: "js/[name].js",
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            "style-loader",
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
        }
      ]
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new HotModulePlugin()
    ],
    devServer: {
      port: 3000,
      contentBase: ['./src', './dist'],
      inline: true,
      hot: true
    },
  }
}