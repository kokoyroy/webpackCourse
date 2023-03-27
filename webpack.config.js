const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // entry point of the app
  output: {
    filename: "bundle[contenthash].js", // name of the outputted file
    path: path.resolve(__dirname, "dist"), // path of the outputted file
    publicPath: "", // path to the assets folder
  },

  mode: "none", // we set this to none to minimize the outputted file
  module: {
    rules: [
      {
        test: /\.(png |jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // 3kb
          },
        },
      },
      {
        test: /\.css$/, // test for css files
        use: [MiniCssExtractPlugin.loader, "css-loader"], // css-loader converts css to js
      },
      {
        test: /\.scss$/, // test for scss files
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // sass-loader compiles scss to css
      },
      {
        test: /\.js$/, // test for js files
        exclude: /node_modules/, // exclude node_modules folder
        use: {
          // use is an array of loaders
          loader: "babel-loader", // converts the code to es5
          options: {
            // babel options
            presets: ["@babel/preset-env"], // converts the code to es5
          },
        },
      },
    ],
  },
  plugins: [
    new TerserPlugin(), // minifies the outputted file
    new MiniCssExtractPlugin({
      filename: "styles[contenthash].css", // name of the outputted file
    }), // extracts the css into a separate file
    new HtmlWebpackPlugin({
      title: "webpack course", // title of the html file
      filename: "index.html", // name of the outputted file
      meta: {
        description: "webpack course", // meta description
      },
      template: "./src/index.html", // template file
    }),
    new CleanWebpackPlugin(),
  ],
};
