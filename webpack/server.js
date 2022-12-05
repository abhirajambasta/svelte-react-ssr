const path = require("path");

const NodeExternals = require("webpack-node-externals");
const PRODUCTION = process.env.NODE_ENV === "production";
const DEVELOPMENT = !PRODUCTION;

module.exports = {
  name: "server",
  target: "node",
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
    },
  },
  node: {
    __dirname: false,
  },
  // don't bundle node_modules
  externals: [NodeExternals()],
  entry: "./server/index.js",
  mode: PRODUCTION ? "production" : "development",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: PRODUCTION
                ? "static/styles-[hash].css"
                : "static/styles.css",
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: "svelte-loader",
          options: {
            dev: false,
            immutable: true,
            generate: "ssr",
            emitCss: false,
          },
        },
      },
      {
        test: /\.(js|mjs)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: DEVELOPMENT,
            },
          },
        ],
      },
    ],
  },
  stats: {
    colors: true,
  },
};
