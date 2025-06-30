const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/auth.routes');
const sequelize = require('../config/db');
const User = require('../models/user');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth endpoints', () => {
  test('POST /auth/register - crea un nuevo usuario', async () => {
    const res = await request(app).post('/auth/register').send({
      username: 'tester',
      email: 'tester@example.com',
      password: 'test1234'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Usuario registrado con éxito');
  });

  test('POST /auth/login - retorna un token JWT válido', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'tester@example.com',
      password: 'test1234'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
