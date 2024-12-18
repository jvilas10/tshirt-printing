// db.js
const mysql = require('mysql2');

// Create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost', // Your MySQL host
  user: 'root',      // Your MySQL user
  password: '',      // Your MySQL password
  database: 'ecommerce-t-shirt-printing'   // Your MySQL database
});

// Test the connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = connection;
