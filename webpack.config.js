const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index",
  cache: false,

  mode: 'development',
  devServer: {
    port: 5001,
  },
  devtool: "source-map",
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("@babel/preset-react")],
        },
      },
      {
        test: /\.md$/,
        loader: "raw-loader",
      },
      {
        test: /\.css$/, use: [ 'style-loader', 'css-loader' ]
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      // For remotes (please adjust)
      name: "react1",
      // library: { type: "module" },
      filename: "remoteEntry.js", // <-- Meta Data
      exposes: {
          './web-components': './src/App',
      },        
      shared: {
        ...deps,
        "react": { requiredVersion: deps["react"], singleton: true },
        "react-dom": { requiredVersion: deps["react-dom"], singleton: true }
      }
    }),
    new HtmlWebpackPlugin({
      template:
        './public/index.html',
    }),
  ],
};