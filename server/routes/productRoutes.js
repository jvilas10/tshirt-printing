// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const productContoller=require('../controllers/productController')
// Define routes and link them to the controllers
router.get('/', productContoller.getProduct);
router.post('/', productContoller.createProducts);

module.exports = router;
