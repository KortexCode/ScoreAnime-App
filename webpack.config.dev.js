const path = require('path'); //nos permite saber donde está ubicado este proyecto
//PLUGINS
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', //punto de entrada del proyecto
  output: {
    //punto de salida del proyecto optimizado y terminado
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', //nombre del archivo optimizado(el index.js)
    publicPath: '/',
  },
  mode: 'development',
  resolve: {
    //Para identificar con que extensiones va a trabajar
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Score Anime',
      inject: true,
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    historyApiFallback: true, //para tener un historial
    port: 9000, //configura el puerto
    open: true,
  },
};
