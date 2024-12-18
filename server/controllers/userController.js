// controllers/userController.js
const connection = require('../config/db');

// Get all users
const getUsers = (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json(results);
  });
};

// Get a user by ID
const getUser = (req, res) => {
  const userId = req.params.id;
  connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(results[0]);
  });
};

// Create a new user
const createUser = (req, res) => {
  const { name, email } = req.body;
  connection.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ id: results.insertId, name, email });
    }
  );
};

// Update a user by ID
const updateUser = (req, res) => {
  const { name, email } = req.body;
  const userId = req.params.id;
  connection.query(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ id: userId, name, email });
    }
  );
};

// Delete a user by ID
const deleteUser = (req, res) => {
  const userId = req.params.id;
  connection.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
