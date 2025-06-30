# Book API - Backend con Seguridad, Pruebas y Despliegue

API REST para gestión de libros, desarrollada con Node.js, Express y PostgreSQL. Incluye autenticación JWT, protección de rutas, pruebas automatizadas y despliegue con Docker.

## Tecnologías

- Node.js + Express
- PostgreSQL + Sequelize
- bcrypt + JWT
- Helmet
- Jest + Supertest
- Docker + docker-compose
- dotenv

## Estructura del proyecto

```
book-api/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── services/
├── config/
├── tests/
├── Dockerfile
├── docker-compose.yml
├── .env
├── server.js
```

## Configuración

1. Clona el repositorio y entra en el directorio
2. Crea el archivo `.env` con las siguientes variables:

```
PORT=3000
DB_NAME=booksdb
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
JWT_SECRET=supersecretkey
```

3. Ejecuta la app con Docker:

```
docker-compose up --build
```

---

## Autenticación

### POST `/auth/register`
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "securepass123"
}
```

### POST `/auth/login`
```json
{
  "email": "admin@example.com",
  "password": "securepass123"
}
```

Devuelve un token JWT para acceder a rutas protegidas.

---

## Endpoints `/books` (requieren JWT)

### POST `/books`
```json
{
  "title": "1984",
  "author": "George Orwell",
  "publishedDate": "1949-06-08",
  "description": "Distopía política sobre vigilancia y control."
}
```

### GET `/books`  
Lista todos los libros del usuario.

### GET `/books/:id`  
Devuelve un libro específico.

### PUT `/books/:id`
```json
{
  "description": "Actualizado"
}
```

### DELETE `/books/:id`  
Elimina el libro.

---

## Pruebas automatizadas

Ejecuta:

```bash
NODE_ENV=test npm test
```

- `auth.test.js`: prueba registro y login
- `books.test.js`: prueba CRUD de libros autenticados

---

## Despliegue con Docker

- `Dockerfile` define el contenedor del backend
- `docker-compose.yml` levanta la API y PostgreSQL
- La app está lista para ser desplegada en Heroku, Railway, etc.