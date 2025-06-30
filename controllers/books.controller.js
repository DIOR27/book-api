const Book = require('../models/book');

async function getAll(req, res) {
  const books = await Book.findAll({ where: { userId: req.user.id } });
  res.json(books);
}

async function getById(req, res) {
  const book = await Book.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(book);
}

async function create(req, res) {
  const { title, author, publishedDate, description } = req.body;
  const book = await Book.create({
    title,
    author,
    publishedDate,
    description,
    userId: req.user.id
  });
  res.status(201).json(book);
}

async function update(req, res) {
  const book = await Book.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!book) return res.status(404).json({ error: 'Libro no encontrado' });

  await book.update(req.body);
  res.json(book);
}

async function remove(req, res) {
  const book = await Book.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!book) return res.status(404).json({ error: 'Libro no encontrado' });

  await book.destroy();
  res.json({ message: 'Libro eliminado exitosamente' });
}

module.exports = { getAll, getById, create, update, remove };
