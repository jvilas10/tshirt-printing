// app.js
const express = require('express');
const dotenv = require('dotenv');
const connection = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Use routes for /api/users
app.use('/api/users', userRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
