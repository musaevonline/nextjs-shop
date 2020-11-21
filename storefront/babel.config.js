module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "transform-class-properties",
    "@babel/transform-runtime",
    "lodash",
    [
      "babel-plugin-import",
      {
        "libraryName": "@material-ui/core",
        "libraryDirectory": "esm",
        "camel2DashComponentName": false
      },
      "core"
    ],
    [
      "babel-plugin-import",
      {
        "libraryName": "@material-ui/icons",
        "libraryDirectory": "esm",
        "camel2DashComponentName": false
      },
      "icons"
    ]
  ]
};