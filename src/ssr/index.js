const fs = require('fs');
const render = require('./render');

const PLACEHOLDER = '<div id="ssr-placeholder"></div>';

async function process(request, response) {
  const homeFileBuffer = fs.readFileSync('./dist/index.html');
  const htmlText = homeFileBuffer.toString();
  console.log(htmlText);
  console.log();
  const [precontent, postcontent] = htmlText.split(PLACEHOLDER);
  response.writeHead(206, { 'Content-Type': 'text/html; charset=utf-8' });
  response.write(precontent);
  const content = await render();
  console.log(content);
  response.write(content);
  response.write(postcontent);
  response.end();
}
module.exports = process;
