const connection = require('../config/db');
const sendResponse = require('../utils/responseHandler');

// Get all users
const getUsers = (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return sendResponse(res, 500, false, 'Database error');
    }
    sendResponse(res, 200, true, 'Users retrieved successfully', results);
  });
};

// Get a user by login
const getLoginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(res, 400, false, 'Email and password are required');
  }

  connection.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        return sendResponse(res, 500, false, 'Database error');
      }
      if (results.length === 0) {
        return sendResponse(res, 404, false, 'User not found');
      }
      sendResponse(res, 200, true, 'Login successful', results[0]);
    }
  );
};

// Get a user by ID
const getUser = (req, res) => {
  const userId = req.params.id;
  connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return sendResponse(res, 500, false, 'Database error');
    }
    if (results.length === 0) {
      return sendResponse(res, 404, false, 'User not found');
    }
    sendResponse(res, 200, true, 'User retrieved successfully', results[0]);
  });
};

// Create a new user
const createUser = (req, res) => {
  const { name, email, password, profilePic } = req.body;

  if (!name || !email || !password) {
    return sendResponse(res, 400, false, 'Name, email, and password are required');
  }

  connection.query(
    'INSERT INTO users (name, email, password, profilePic, role) VALUES (?, ?, ?, ?, ?)',
    [name, email, password, profilePic, 0],
    (err, results) => {
      if (err) {
        return sendResponse(res, 500, false, 'Database error');
      }
      sendResponse(res, 201, true, 'User created successfully', { id: results.insertId, name, email });
    }
  );
};

// Update a user by ID
const updateUser = (req, res) => {
  const { name, email } = req.body;
  const userId = req.params.id;

  if (!name || !email) {
    return sendResponse(res, 400, false, 'Name and email are required');
  }

  connection.query(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, userId],
    (err, results) => {
      if (err) {
        return sendResponse(res, 500, false, 'Database error');
      }
      if (results.affectedRows === 0) {
        return sendResponse(res, 404, false, 'User not found');
      }
      sendResponse(res, 200, true, 'User updated successfully', { id: userId, name, email });
    }
  );
};

// Delete a user by ID
const deleteUser = (req, res) => {
  const userId = req.params.id;
  connection.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return sendResponse(res, 500, false, 'Database error');
    }
    if (results.affectedRows === 0) {
      return sendResponse(res, 404, false, 'User not found');
    }
    sendResponse(res, 204, true, 'User deleted successfully');
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getLoginUser,
};
