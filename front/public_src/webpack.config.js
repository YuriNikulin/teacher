const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  return {
    entry: './index.js',
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|ico|jpg|jpeg|gif|svg|woff|woff2)$/i,
          use: {
            loader: 'file-loader',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Output Management',
        template: path.resolve(__dirname, 'index.html'),
      }),
    ],
    devServer: {
      contentBase: './dist',
      historyApiFallback: true,
      openPage: 'teacher',
      proxy: {
        '*': {
          target: 'http://localhost',
        },
      },
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../public/dist'),
      publicPath: '/teacher/front/public/dist/',
    },
  };
};
