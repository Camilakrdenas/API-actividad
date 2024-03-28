const express = require('express');
const mysql = require('mysql2/promise');
const { validationResult } = require('express-validator');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myapp_bd',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get('/', (req, res) => {
  res.send('Welcome to user-api!');
});

app.post('/register', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre_usuario, contrasena } = req.body;

  try {
    const [result] = await db.query('INSERT INTO usuarios (nombre_usuario, contrasena) VALUES (?, ?)', [nombre_usuario, contrasena]);
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre_usuario, contrasena } = req.body;

  try {
    const [result] = await db.query('SELECT * FROM usuarios WHERE nombre_usuario = ? AND contrasena = ?', [nombre_usuario, contrasena
    ]);
    if (result.length > 0) {
      res.status(200).json({ message: 'Logged in successfully!' });
    } else {
      res.status(401).json({ message: 'Invalid name or password.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});