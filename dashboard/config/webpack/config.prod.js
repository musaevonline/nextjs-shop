const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

module.exports = ({ sourceDir, distDir }) => ({
  output: {
    filename: "js/[name].[contenthash].js"
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              'sourceMap': true,
              'plugins': function () {
                return [autoprefixer];
              }
            }
          },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    })
  ]
});