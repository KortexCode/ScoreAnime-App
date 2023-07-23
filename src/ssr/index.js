const http = require('http');
const fs = require('fs');
const render = require('./render');

const PLACEHOLDER = '<div id="ssr-placeholder"></div>';

/**
 * Server Side Render the Home Page
 *
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */

async function process(request, response) {
  const homeFileBuffer = fs.readFileSync('./index.html');
  const htmlText = homeFileBuffer.toString();
  console.log(htmlText);
  const [precontent, postcontent] = htmlText.split(PLACEHOLDER);
  response.writeHead(206, { 'Content-Type': 'text/html; charset=utf-8' });
  response.write(precontent);
  const content = await render();
  console.log(content);
  response.write(content);
  response.write(postcontent);
  response.end();
}
process();

/* async function process(request, response) {
  const homeFileBuffer = fs.readFileSync('./index.html');
  const htmlText = homeFileBuffer.toString();
  const [precontent, postcontent] = htmlText.split(PLACEHOLDER);

  response.writeHead(206, { 'Content-Type': 'text/html; charset=utf-8' });
  response.write(precontent);

  const content = await render();
  response.write(content);

  response.write(postcontent);
  response.end();
} */

/* module.exports = process; */
