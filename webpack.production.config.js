var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./app.js",
  devtool: "source-map",
  output: {
    path: path.resolve("./public"),
    filename: "app.js",
    library: "ReactFormBuilder",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css", ".json"],
    alias: {
      jquery: path.join(__dirname, "./jquery-stub.js"),
    },
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$|.jsx?$/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["./node_modules"],
              },
            },
          },
        ],
      },
      // Add the following rule for Tailwind CSS support
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader", // This will process your CSS with PostCSS (required for Tailwind)
        ],
      },
    ],
  },
};
