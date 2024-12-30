const connection = require('../config/db');
const sendResponse = require('../utils/responseHandler');

// Get all getproduct
const getAddToCartProduct = (req, res) => {
  connection.query('SELECT * FROM addtocart', (err, results) => {
    if (err) {
      return sendResponse(res, 500, false, 'Database error');
    }
    sendResponse(res, 200, true, 'Card data retrieved successfully', results);
  });
};


const addToCartProduct = (req, res) => {
    const { productId, quantity, userId } = req.body;
  
    // Validate input
    if (!productId || !quantity || !userId) {
      return sendResponse(res, 400, false, 'userId, quantity, and productId are required');
    }
  
    // Check if the product already exists in the cart for the user
    const checkProductQuery = 'SELECT * FROM addtocart WHERE productId = ? AND userId = ?';
    connection.query(checkProductQuery, [productId, userId], (err, results) => {
      if (err) {
        return sendResponse(res, 500, false, 'Database error');
      }
  
      if (results.length > 0) {
        // Product already exists in the cart
        return sendResponse(res, 200, true, 'Product already exists in the cart', {});
      }
  
      // If not, insert the product into the cart
      const insertProductQuery = 'INSERT INTO addtocart (productId, quantity, userId) VALUES (?, ?, ?)';
      connection.query(insertProductQuery, [productId, quantity, userId], (err, results) => {
        if (err) {
          return sendResponse(res, 500, false, 'Database error');
        }
  
        sendResponse(res, 201, true, 'Product added to cart successfully', { id: results.insertId });
      });
    });
  };
  


  const countAddToCartProduct = (req, res) => {
    const { userId } = req.body;
    connection.query('SELECT * FROM addtocart WHERE userId = ?', [userId], (err, results) => {
        if (err) {
          return sendResponse(res, 500, false, 'Database error');
        }
        sendResponse(res, 200, true, 'addtocart retrieved successfully',{
            count : results.length
        } );
      });
  };


module.exports = {
    getAddToCartProduct,
    addToCartProduct,
    countAddToCartProduct
 };