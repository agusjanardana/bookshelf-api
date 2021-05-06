const { addBookHandler, getAllBook } = require('../modules/api-handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBook,
  },
];

module.exports = routes;
