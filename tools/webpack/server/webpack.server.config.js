import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import path from 'path';

const config = {
  target: 'node',
  cache: false,
  context: __dirname,
  debug: false,
  devtool: 'source-map',
  entry: ['../../../src/server-entry.js'],
  output: {
    path: path.join( __dirname, '../../../dist' ),
    filename: 'server.js',
  },
  plugins: [
    new webpack.DefinePlugin( {
      __CLIENT__: false,
      __SERVER__: true,
      __PRODUCTION__: true,
      __DEV__: false,
    } ),
  ],
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
        test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
        loader: 'file?context=static&name=/[path][name].[ext]',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loaders: [
          'babel',
        ],
        exclude: /node_modules/,
      },
    ],
    postLoaders: [],
    noParse: /\.min\.js/,
  },
  externals: [nodeExternals( {
    whitelist: [
      'webpack/hot/poll?1000',
    ],
  } )],
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
      'static',
    ],
    extensions: [
      '',
      '.json',
      '.js',
      '.jsx',
    ],
  },
  node: {
    __dirname: true,
    fs: 'empty',
  },
};

export default config;
