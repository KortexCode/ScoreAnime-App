const http = require('http');
const handler = require('serve-handler');
const ssrHome = require('./src/ssr');

const server = http.createServer(async (req, res) => {
  console.log(req.url);

  try {
    if (req.url === '/') {
      await ssrHome(req, res);
    } else {
      await handler(req, res, { public: './dist' });
    }
  } catch (error) {
    console.error(error);
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
