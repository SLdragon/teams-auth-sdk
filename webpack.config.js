const path = require('path');
const libraryName = 'teamscloud';

module.exports = {
  entry: {
    'teamscloud.min': './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'out'),
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  mode:"development",
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false,
    /*
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            reduce_funcs: false,
            inline: false,
          },
        },
        include: /\.min\.js$/,
      }),
     
    ], */
  }
};
