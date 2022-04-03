const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: [
    "./src/ts/index.ts",
    "./src/scss/index.scss",
  ],
  resolve: {
    extensions: [
      ".ts",
    ],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
  ],
  module: {
    rules: [
      {
        rules: [
          {
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node_modules/,
          },
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-focus-within",
                  "postcss-object-fit-images",
                  "autoprefixer",
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      // Include default minimizer options along with custom
      "...",
      new CssMinimizerPlugin(),
    ],
  },
  devtool: "source-map",
};