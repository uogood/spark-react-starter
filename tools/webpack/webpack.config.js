import webpack from 'webpack';
import path from 'path';

const config = {
  cache: true,
  entry: {
    entry: ['babel-polyfill', './src/entry.js'],
    index: ['file?name=index.html!jade-html!./src/index.jade'],
  },
  output: {
    path: path.join( __dirname, '../../dist' ),
    filename: '[name].js',
    publicPath: 'http://localhost:8090/',
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin( {
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    } ),
  ],
};

export default config;
