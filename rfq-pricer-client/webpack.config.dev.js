import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';

export default {
  mode:'development',
  devtool: 'inline-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'app/index')
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'app')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject:true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      path: './envs/dev.env', // load this now instead of the ones in '.env'
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
