const Hapi = require('@hapi/hapi');
require('dotenv').config();

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

  await server.start();
  console.log(`Your server is running under ${server.info.uri}`);
};

start();
