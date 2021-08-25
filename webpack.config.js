var path = require("path");

module.exports = {
  entry: "./src/components/index.ts",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  externals: {
    react: "umd react",
    "react-dom": "umd react-dom",
  },
  performance: {
    hints: false,
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};
