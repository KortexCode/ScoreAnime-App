const path = require('path'); //nos permite saber donde está ubicado este proyecto
module.exports = {
  entry: './src/index.js', //punto de entrada del proyecto
  output: {
    //punto de salida del proyecto optimizado y terminado
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', //nombre del archivo optimizado(el index.js)
    publicPath: '/',
  },
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
