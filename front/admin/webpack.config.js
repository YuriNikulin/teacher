const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isProd = env => env === 'production';

module.exports = env => {
  return {
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|ico|jpg|jpeg|gif|svg|woff|woff2)$/i,
          use: {
            loader: 'file-loader',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css'],
      alias: {
        '@constants': path.resolve(__dirname, './src/constants'),
        '@store': path.resolve(__dirname, './src/store'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@components': path.resolve(__dirname, './src/components'),
        '@helpers': path.resolve(__dirname, './src/helpers'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Output Management',
        template: path.resolve(__dirname, 'index.html'),
      }),
      new webpack.DefinePlugin({
        'process.env.ENV': JSON.stringify(env.ENV),
      }),
    ],
    devServer: {
      contentBase: './dist',
      historyApiFallback: true,
      openPage: 'teacher/admin',
      proxy: {
        '/api/**': {
          target: 'http://localhost/teacher',
        },
      },
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/teacher/front/admin/dist/',
    },
  };
};
