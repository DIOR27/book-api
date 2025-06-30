const request = require('supertest');
const express = require('express');
const bookRoutes = require('../routes/books.routes');
const authRoutes = require('../routes/auth.routes');
const sequelize = require('../config/db');
const User = require('../models/user');
const Book = require('../models/book');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Registrar usuario y guardar token
  await request(app).post('/auth/register').send({
    username: 'bookuser',
    email: 'bookuser@example.com',
    password: 'book1234'
  });

  const res = await request(app).post('/auth/login').send({
    email: 'bookuser@example.com',
    password: 'book1234'
  });

  token = res.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Books endpoints', () => {
  let bookId;

  test('POST /books - crear libro', async () => {
    const res = await request(app)
      .post('/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'El Principito',
        author: 'Antoine de Saint-Exupéry',
        publishedDate: '1943-04-06',
        description: 'Un clásico infantil filosófico.'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('El Principito');
    bookId = res.body.id;
  });

  test('GET /books - obtener lista', async () => {
    const res = await request(app)
      .get('/books')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('GET /books/:id - obtener un libro', async () => {
    const res = await request(app)
      .get(`/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(bookId);
  });

  test('PUT /books/:id - actualizar libro', async () => {
    const res = await request(app)
      .put(`/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'Actualizado.' });

    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe('Actualizado.');
  });

  test('DELETE /books/:id - eliminar libro', async () => {
    const res = await request(app)
      .delete(`/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminado/i);
  });
});
