const express = require('express');
const { saveCart, getCart, addItemToCart } = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getCart);
router.post('/save', verifyToken, saveCart);
router.post('/add', verifyToken, addItemToCart);

module.exports = router;