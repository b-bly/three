const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const browserPlugin = require('webpack-browser-plugin');
// const chromeUserDataDir = './dist';

module.exports = {
  entry: {
    app: './src/index.js',
    // game: './src/game.js',
    // boardController: './src/board-controller.js'
  },

  // mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Three Practice',
      myPageHeader: 'Three.js',
      template: path.resolve(__dirname, 'src/index.ejs'),
      filename: './index.html'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8000,
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      "Access-Control-Allow-Origin": "*"
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      // {
      //   type: 'javascript/auto',
      //   test: /\.jsonx$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: "./[name].[ext]"
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(json|obj)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "./[name].[ext]"
            }
          }
        ]
      }
    ]
  }
  // plugins: [
  //   new browserPlugin({
  //     openOptions: {
  //       app: [
  //         'chrome',
  //         //'--incognito',
  //         '--disable-web-security', // to enable CORS
  //         '--user-data-dir=' + path.resolve(chromeUserDataDir) // to let Chrome create and store here developers plugins, settings, etc.
  //       ]
  //     }
  //   })
  // ]
};

// Cors issue
// https://github.com/webpack/webpack-dev-server/issues/533