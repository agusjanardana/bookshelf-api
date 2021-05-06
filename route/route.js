const {
  addBookHandler,
  getAllBook,
  getBooksDetailed,
} = require('../modules/api-handler');

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
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBooksDetailed,
  },
];

module.exports = routes;
