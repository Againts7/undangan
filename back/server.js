/* eslint-disable no-console */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const customApi = 'kustom-api';

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], // Mengizinkan semua origin
      },
    },
  });

  server.ext('onRequest', (request, h) => {
    const { referer } = request.headers;
    const { kode } = request.query;
    console.log(referer);
    if (customApi !== kode) {
      return h.response({ message: 'invalid code' }).code(400).takeover();
    }
    if (referer !== 'http://127.0.0.1:5500/') {
      return h.response({ message: 'invalid code' }).code(403).takeover();
    }
    return h.continue;
  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
