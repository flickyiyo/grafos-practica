const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },  
  devServer: {
    port: 9000,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['*','.js', '.jsx', '.json']
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react','es2015','stage-2'],
            plugins:["transform-decorators-legacy", "transform-class-properties"]
          }
        }
      }
    ]
  },
}