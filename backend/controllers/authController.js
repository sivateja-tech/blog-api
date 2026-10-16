const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, email`,
      [name, email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const userData = { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email };
    const token = jwt.sign({ userId: user.rows[0].id, email: user.rows[0].email, name: user.rows[0].name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: userData });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };