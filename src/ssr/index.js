const fs = require('fs');
const render = require('./render');

//En el html existe esta etiqueta como referencia para cortar el documento
const PLACEHOLDER = '<div id="ssr-placeholder"></div>';

async function process(request, response) {
  //Se lee el index.html
  const homeFileBuffer = fs.readFileSync('./dist/index.html');
  const htmlText = homeFileBuffer.toString(); //Se convierte a string
  //Cortamos el html
  const [precontent, postcontent] = htmlText.split(PLACEHOLDER);
  //Indicamos que tipo de información enviaremos al documento en el browser
  response.writeHead(206, { 'Content-Type': 'text/html; charset=utf-8' });
  response.write(precontent); //Se escribe el primer pedazo
  const content = await render();
  response.write(content); //Se escribe el otro pedazo de html creado con JS
  response.write(postcontent); //Se escribe el pedazo final que se cortó antes
  response.end();
}
module.exports = process;
