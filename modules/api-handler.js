const { nanoid } = require('nanoid');
const books = require('../modules/booktemp');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16); // id dengan panjang 16
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // karena bersifat synchronus, maka program dijalankan baris perbaris dan di lakukan logic sesuai urutan dan nilai returnnya.
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(newBook); // push newbook ke array book

  // filter berdasarkan id untuk cek apakah sudah ada didalam array
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
};

const getAllBook = (request, h) => ({
  status: 'success',
  data: {
    books: books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    })),
  },
});

const getBookByQuery = (request, h) => {
  const { name, finished, reading } = request.query; // get query dari route
  const tempBook = [...books]; // simpan semua nilai dalam property dari books ke tempBook
  let hasilBook = tempBook; // menyimpan tempBook ke variabel hasilbook untuk proses selanjutnya.

  if (name !== undefined) {
    hasilBook = tempBook.filter((temp) =>
      temp.name.toLowerCase().includes(name.toLowerCase)
    ); //sumber case sensitive di stackoverflow.
  }
  if (finished !== undefined) {
    hasilBook = tempBook.filter((temp) => temp.finished === '1');
  }

  if (reading !== undefined) {
    hasilBook = tempBook.filter((temp) => temp.reading === '1');
  }
  // semua nilai yang dibutuhkan disimpan di variabel hasilBook untuk req by query.

  const hasilBook2 = hasilBook.map((temp) => ({
    id: temp.id,
    name: temp.name,
    publisher: temp.publisher,
  }));

  return h
    .response({
      status: 'success',
      message: 'Data didapatkan',
      books: [
        {
          hasilBook2,
        },
      ],
    })
    .code(200);
};

const getBooksDetailed = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((x) => x.id === bookId)[0];

  if (book !== undefined) {
    // const response = h.response({
    //   status: 'success',
    //   data: { book },
    // });

    // response.code(200);
    // return response;

    return h.response({ status: 'success', data: { book } }).code(200);
  }

  //   const response = h.response({
  //     status: 'fail',
  //     message: 'Buku tidak ditemukan',
  //   });
  //   response.code(404);
  //   return response;

  return h
    .response({ status: 'fail', message: 'Buku tidak ditemukan' })
    .code(404);
};

const editBookById = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);

  // jika array tidak kosong atau id telah ditemukan, maka akan dijalankan
  if (index !== -1) {
    if (!name) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        .code(400);
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: 'fail',
          message:
            'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
    }

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    return h
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      .code(200);
  }

  return h
    .response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    .code(404);
};

const deleteBookById = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    return h
      .response({ status: 'success', message: 'Buku berhasil dihapus' })
      .code(200);
  }

  return h
    .response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    })
    .code(404);
};

module.exports = {
  addBookHandler,
  getAllBook,
  getBooksDetailed,
  editBookById,
  deleteBookById,
  getBookByQuery,
};
