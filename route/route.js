const {
  addBookHandler,
  getAllBook,
  getBooksDetailed,
  editBookById,
  deleteBookById,
  getBookByQuery,
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
    path: '/books/',
    handler: getBookByQuery,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBooksDetailed,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookById,
  },
];

module.exports = routes;
