const path = require('path');

module.exports = {
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
    ]
  },
  entry: {
    app: './src/index.js',
    game: './src/game.js',
    boardController: './src/board-controller.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};


// module.exports = {
//   +   entry: {
//   +     app: './src/index.js',
//   +     game: './src/game.js',
//   +   },
//       output: {
//   +     filename: '[name].bundle.js',
//         path: path.resolve(__dirname, 'dist'),
//       },
//     };