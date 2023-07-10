module.exports = {
  entry: './src/index.tsx', //punto de entrada del proyecto
  output: {
    //punto de salida del proyecto optimizado y terminado
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', //nombre del archivo optimizado(el index.js)
    publicPath: './', //de manera manual esta es el "src" del js y css dentro del index.html
    assetModuleFilename: 'assets/images/[hash][ext]',
  },
  mode: 'development',
};
