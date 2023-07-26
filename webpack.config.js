const path = require('path'); //nos permite saber donde está ubicado este proyecto
//PLUGINS
//Optimizar archivos al comprimirlos
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//Minizar JS y Css
const TeserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
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
  new CleanWebpackPlugin(),
];

//Se agregará a los plugins dependiendo del comando usado en npm
const shouldAnalyze = process.argv.includes('--analyze');
if (shouldAnalyze) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  entry: './src/frontend/index.js', //punto de entrada del proyecto
  output: {
    //punto de salida del proyecto optimizado y terminado
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', //nombre del archivo optimizado(el index.js)
    publicPath: './',
    assetModuleFilename: 'assets/[hash][ext]',
  },
  mode: 'production',
  resolve: {
    //Para identificar con que extensiones va a trabajar
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
  optimization: {
    minimize: true,
    minimizer: [new TeserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          filename: '[name].bundle.js',
          idHint: 'vendors',
        },
      },
    },
  },
};
