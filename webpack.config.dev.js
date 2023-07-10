const path = require('path'); //nos permite saber donde está ubicado este proyecto
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
  devServer: {
    static: {
      directory: path.join(__dirname, './'),
    },
    compress: true,
    historyApiFallback: true, //para tener un historial
    port: 9000, //configura el puerto
    open: true,
  },
};
