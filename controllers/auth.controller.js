const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwtService = require('../services/jwt.service');

const saltRounds = 10;

async function register(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ username, email, passwordHash });
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(400).json({ error: 'No se pudo registrar el usuario', detail: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwtService.sign({ id: user.id, email: user.email });
  res.json({ token });
}

module.exports = { register, login };
