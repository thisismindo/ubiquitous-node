jest.resetModules();
jest.setTimeout(120000);

jest.mock('../src/libs/dbClient');

const dbClient = require('../src/libs/dbClient');

const { createBook, getBooks, getBookById, updateBook, deleteBook } = require('../src/data/bookRepository');

describe('Book Repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    dbClient.execute = jest.fn().mockResolvedValue([{}]);
  });

  it('should insert a book and return its ID', async () => {
    const title = 'New Book';
    const author = 'Author Test';

    dbClient.execute.mockResolvedValue([{ insertId: 1 }]);

    const result = await createBook(title, author);

    expect(result).toBe(1);
  });

  it('should return all books', async () => {
    dbClient.execute.mockResolvedValue([[{ id: 1, title: 'Mock Book', author: 'Mock Author' }]]);

    const books = await getBooks();

    expect(books).toEqual({'ids':[1], 'records':{'1':{ id: 1, title: 'Mock Book', author: 'Mock Author' }}});
  });

  it('should return a book by its ID', async () => {
    const id = 1;
    dbClient.execute.mockResolvedValue([[{ id: 1, title: 'Mock Book', author: 'Mock Author' }]]);

    const book = await getBookById(id);

    expect(book).toEqual({ id: 1, title: 'Mock Book', author: 'Mock Author' });
  });

  // it('should update book details', async () => {
  //   dbClient.execute.mockResolvedValue({ affectedRows: 1 });

  //   const id = 1;
  //   const title = 'Updated Book';
  //   const author = 'Updated Author';

  //   await updateBook(id, title, author);

  //   console.log('Mock Calls:', dbClient.execute.mock.calls); // Debugging log

  //   expect(dbClient.execute).toHaveBeenCalledTimes(1);
  //   expect(dbClient.execute).toHaveBeenCalledWith(
  //     'UPDATE books SET title = ?, author = ? WHERE id = ?',
  //     [title, author, id]
  //   );
  // });

  // it('should delete a book by its ID', async () => {
  //   dbClient.execute.mockResolvedValue({ affectedRows: 1 });

  //   const id = 1;

  //   await deleteBook(id);

  //   console.log('Mock Calls:', dbClient.execute.mock.calls); // Debugging log

  //   expect(dbClient.execute).toHaveBeenCalledTimes(1);
  //   expect(dbClient.execute).toHaveBeenCalledWith(
  //     'DELETE FROM books WHERE id = ?',
  //     [id]
  //   );
  // });

});
