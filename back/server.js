/* eslint-disable no-console */

const Hapi = require('@hapi/hapi');
const Path = require('path');
const Basic = require('@hapi/basic');
const routes = require('./routes');

const customApi = 'kustom-api';
const users = {
  john: {
    username: 'john',
    password: '123',
    name: 'John Doe',
    id: '1a',
  },
};
const validate = async (request, username, password, h) => {
  const user = users[username];
  if (!user && user.password !== password) {
    return { credentials: null, isValid: false };
  }
  return {
    isValid: true,
    credentials: { username: user.username, name: user.name, id: user.id },
  };
};

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    // routes: {
    //   cors: {
    //     origin: ['*'], // Mengizinkan semua origin
    //   },
    // },
  });

  await server.register(require('@hapi/inert'));
  await server.register(Basic);

  server.auth.strategy('simple', 'basic', { validate });
  server.auth.default('simple');

  // server.ext('onRequest', (request, h) => {
  //   const { referer } = request.headers;
  //   const { kode } = request.query;
  //   console.log('ini referer', referer);
  //   console.log('ini kode', kode);
  //   console.log(Path.join(__dirname, '../dist/'));
  //   if (customApi !== kode) {
  //     return h.response({ message: 'invalid code api' }).code(400).takeover();
  //   }
  //   // if (referer !== 'http://127.0.0.1:3000/') {
  //   //   return h.response({ message: 'invalid referer' }).code(403).takeover();
  //   // }
  //   return h.continue;
  // });

  server.route(routes);

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname, '../dist'),
        redirectToSlash: true,
        index: ['index.html'],
      },
    },
    options: {
      auth: 'simple',
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
