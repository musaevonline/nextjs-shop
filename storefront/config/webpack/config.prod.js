const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const optimization = ()=>{
  return {
    minimizer: [new TerserPlugin({
      test: /\.js(\?.*)?$/i,
    })],
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: chunk => chunk.name === 'main',
          reuseExistingChunk: true,
          priority: 1,
          test: module =>
              /[\\/]node_modules[\\/]/.test(module.context),
          minChunks: 1,
          minSize: 0,
        },
      }
    }
  };
};

module.exports = ({ sourceDir, distDir }) => ({
  output: {
    filename: "js/[name].[contenthash].js"
  },
  optimization: optimization(),
  devtool: '',
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
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new OptimizeCssAssetsPlugin(),
    new TerserPlugin(),
    new BundleAnalyzerPlugin()
  ]
});