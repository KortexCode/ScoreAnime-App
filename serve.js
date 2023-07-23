const handler = require('serve-handler');
const http = require('http');
const ssrHome = require('./src/ssr');

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  ssrHome(request, response);
  return handler(request, response, { public: './dist' });
});

server.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});
