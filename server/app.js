// app.js
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRouters=require('./routes/productRoutes')
const cardRouters=require('./routes/cardRouter')

dotenv.config();

const app = express();
app.use(express.json());

// Use routes for /api/users
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });
  
app.use('/api/users', userRoutes);
app.use('/api/products', productRouters)
app.use('/api/addToCard', cardRouters)

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
