const path = require("path");
const { merge } = require("webpack-merge");

require("dotenv").config();

const baseConfig = require("./config/webpack/config.base");
const devConfig = require("./config/webpack/config.dev");
const prodConfig = require("./config/webpack/config.prod");

const sourceDir = path.join(__dirname, "./src");
const distDir = path.join(__dirname, "./dist");

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";
  const paths = { sourceDir, distDir };

  const base = baseConfig(paths);
  const dev = merge(base, devConfig(paths));
  const prod = merge(base, prodConfig(paths));

  return devMode ? dev : prod;
};