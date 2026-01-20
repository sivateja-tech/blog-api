const pool = require('../config/db');

// GET all blogs
const getAllBlogs = async (req, res, next) => {
  const { search = '', page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      `SELECT * FROM blogs
       WHERE title ILIKE $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [`%${search}%`, limit, offset]
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};


// GET blog by ID
const getBlogById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM blogs WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// CREATE blog
const createBlog = async (req, res, next) => {
  const { title, content, author } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO blogs (title, content, author, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [title, content, author]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// UPDATE blog
const updateBlog = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    const result = await pool.query(
      `UPDATE blogs
       SET title = $1, content = $2, author = $3
       WHERE id = $4
       RETURNING *`,
      [title, content, author, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// DELETE blog
const deleteBlog = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM blogs WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
