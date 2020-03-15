const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  return {
    entry: ['./index.js'],
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          ],
        },
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
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
