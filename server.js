require('dotenv').config();
const express = require('express');
const sanitize = require('./middlewares/sanitize.middleware');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(express.json());
app.use(sanitize);

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
