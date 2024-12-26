const connection = require('../config/db');
const sendResponse = require('../utils/responseHandler');

// Get all getproduct
const getProduct = (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return sendResponse(res, 500, false, 'Database error');
    }
    sendResponse(res, 200, true, 'Products retrieved successfully', results);
  });
};

// Create a new user
const createProducts = (req, res) => {
    const { brandName, category, productName,description,price,productImage,sellingPrice } = req.body;
  
    if (!brandName || !category || !productName || !price) {
      return sendResponse(res, 400, false, 'brandName, category,price and productName are required');
    }
  
    connection.query(
      'INSERT INTO products (brandname, category, productname,description,price,productimage,sellingprice) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [brandName, category, productName,description,price,productImage,sellingPrice],
      (err, results) => {
        if (err) {
          return sendResponse(res, 500, false, 'Database error');
        }
        sendResponse(res, 201, true, 'Product created successfully', { id: results.insertId});
      }
    );
  };


  const getProductsCategoryWise = (req, res) => {
    const { categories } = req.body; // Expecting categories to be an array

    if (!Array.isArray(categories) || categories.length === 0) {
        return sendResponse(res, 400, false, 'Invalid categories input');
    }

    const placeholders = categories.map(() => '?').join(', '); // Create placeholders for the query
    const query = `SELECT * FROM products WHERE category IN (${placeholders})`;

    connection.query(query, categories, (err, results) => {
        if (err) {
            return sendResponse(res, 500, false, 'Database error');
        }
        if (results.length === 0) {
            return sendResponse(res, 404, false, 'No products found for the provided categories');
        }
        sendResponse(res, 200, true, 'Products retrieved successfully', results);
    });
};

const getProductDetails= (req, res) => {
  const { productId } = req.body; // Expecting categories to be an array
  connection.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
    if (err) {
      return sendResponse(res, 500, false, 'Database error');
    }
    if (results.length === 0) {
      return sendResponse(res, 404, false, 'Product not found');
    }
    sendResponse(res, 200, true, 'Product Details successfully', results[0]);
  });
};

module.exports = {
    getProduct,
    createProducts,
    getProductsCategoryWise,
    getProductDetails,
 };