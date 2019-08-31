import webpack from 'webpack';
import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';

export default {
  mode:'production',
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'app/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../rfq-pricer-server/public'),
    filename: 'bundle.js'
  },
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true
        },
        sourceMap: false
      })
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject:true,
    }),

    new Dotenv({
      path: './envs/prod.env', // load this now instead of the ones in '.env'
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'app'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react','stage-0']
          }
        }
      },
      {
        test: /(\.less|\.css)$/,
        loaders: [
          'style-loader',
          'css-loader?localIdentName=[local]',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader'
      }
    ]
  }
};
