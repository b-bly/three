const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const browserPlugin = require('webpack-browser-plugin');
const chromeUserDataDir = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    app: './src/index.js',
    game: './src/game.js',
    boardController: './src/board-controller.js',
    // server: './src/server.js'
  },
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Three Practice',
      myPageHeader: 'Three.js',
      template: path.resolve(__dirname, 'src/index.ejs'),
      filename: './index.html'
    }),
    // new browserPlugin({
    //   openOptions: {
    //     app: [
    //       'chrome',
    //       //'--incognito',
    //       '--disable-web-security', // to enable CORS
    //       '--user-data-dir=' + chromeUserDataDir // to let Chrome create and store here developers plugins, settings, etc.
    //     ]
    //   }
    // })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    host: 'localhost',
    port: 8000,
    publicPath: '/',
    writeToDisk: true,
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      "Access-Control-Allow-Origin": "*"
    }
  },
  module: {
    rules: [
      {
        test: /\.(obj)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "./3d-assets/[name].[ext]"
            }
          }
        ]
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "./3d-assets/[name].[ext]"
            }
          }
        ]
      },
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
        exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "./3d-assets/[name].[ext]"
            }
          }
        ],
      }

    ]
  }
  // plugins: [

  // ]
};

// Cors issue
// https://github.com/webpack/webpack-dev-server/issues/533