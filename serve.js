const http = require('http');
const handler = require('serve-handler');
const ssrHome = require('./src/ssr');

//Creamos un servidor de NODE.JS(Se puede usar la librería micro en vez de http)
const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/') {
      //Se manejará la solicitud / del browser
      await ssrHome(req, res);
    } else {
      //Las solicitudes que realice el browser como: /favicon, /styles, etc
      await handler(req, res, { public: './dist' });
    }
  } catch (error) {
    res.write('Error de respuesta del servidor');
    res.end();
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
