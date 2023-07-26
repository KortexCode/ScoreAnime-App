const path = require('path'); //nos permite saber donde está ubicado este proyecto
//PLUGINS
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Score Anime',
    inject: true,
    template: './index.html',
  }),
  new MiniCssExtractPlugin({
    filename: 'style.css',
  }),
];
//Se agregará a los plugins dependiendo del comando usado en npm
const shouldAnalyze = process.argv.includes('--analyze');
if (shouldAnalyze) {
  plugins.push(new BundleAnalyzerPlugin());
}
module.exports = {
  output: {
    //punto de salida del proyecto optimizado y terminado
    entry: ['./src/frontend/index.js'], //punto de entrada del proyecto
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins,
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
