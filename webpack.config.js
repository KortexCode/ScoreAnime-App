const path = require('path'); //nos permite saber donde está ubicado este proyecto
module.exports = {
  entry: './src/index.js', //punto de entrada del proyecto
  output: {
    //punto de salida del proyecto optimizado y terminado
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', //nombre del archivo optimizado(el index.js)
    publicPath: './',
  },
  mode: 'production',
  resolve: {
    //Para identificar con que extensiones va a trabajar
    extensions: ['.js'],
  },
};
