/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const nodeExternals = require("webpack-node-externals");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./src");
const PUBLIC_ROOT = abs("./public");
const DIST_ROOT = abs("./dist");
const DIST_PUBLIC = abs("./dist/public");

// a, b, c, ..., z, A, B, ..., Z, _, aa, ab, ... みたいな className を生成するやつ
function* generateShortName() {
  const startChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
  const chars = startChars + "0123456789";
  let iterationCount = 0;
  while (true) {
    let tmp = iterationCount++;
    let name = startChars[tmp % startChars.length];
    tmp = Math.floor(tmp / startChars.length);
    while (tmp > 0) {
      name += chars[tmp % chars.length];
      tmp = Math.floor(tmp / chars.length);
    }
    yield name;
  }
}

const shortNameGenerator = generateShortName();

const shortNameMemo = new Map();

/** @type {Array<import('webpack').Configuration>} */
module.exports = [
  {
    entry: path.join(SRC_ROOT, "client/index.jsx"),
    mode: "production",
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
              },
            },
            {
              loader: "css-loader?modules",
              options: {
                modules: {
                  getLocalIdent: (ctx, localIdentName, localName) => {
                    const hash = `${ctx.resourcePath}_____${localName}`;
                    if (shortNameMemo.has(hash)) {
                      return shortNameMemo.get(hash);
                    }
                    const shortName = shortNameGenerator.next().value;
                    shortNameMemo.set(hash, shortName);
                    return shortName;
                  },
                  mode: "local",
                },
              },
            },
          ],
        },
        {
          exclude: /[\\/]esm[\\/]/,
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    spec: true,
                    targets: {
                      browsers: [
                        "last 1 Chrome version",
                        "last 1 Firefox version",
                      ],
                    },
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        },
      ],
    },
    name: "client",
    optimization: {
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    output: {
      filename: "[name].bundle.js",
      path: DIST_PUBLIC,
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        defaultSizes: "gzip",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new RemoveEmptyScriptsPlugin(),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
    target: "web",
  },
  {
    entry: path.join(SRC_ROOT, "server/index.js"),
    externals: [nodeExternals()],
    mode: "development",
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(js|mjs|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: "cjs",
                    spec: true,
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        },
      ],
    },
    name: "server",
    output: {
      filename: "server.js",
      path: DIST_ROOT,
    },
    resolve: {
      extensions: [".mjs", ".js", ".jsx"],
    },
    target: "node",
  },
];
