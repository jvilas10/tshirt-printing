const express = require('express');
const router = express.Router();
const userController = require('../controllers/addToCardController');

router.get('/', userController.getAddToCartProduct);
router.post('/', userController.addToCartProduct);
router.post('/count', userController.countAddToCartProduct);


module.exports = router;