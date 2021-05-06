const Hapi = require('@hapi/hapi');
require('dotenv').config();
const serverRoutes = require('./route/route');
const start = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  server.route(serverRoutes);
  await server.start();
  console.log(`Your server is running under ${server.info.uri}`);
};

start();
