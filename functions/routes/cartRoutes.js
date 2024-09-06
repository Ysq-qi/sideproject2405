const express = require('express');
const { getCart,syncCartToFirestore,addItemToCart,removeItemFromCart,updateItemQuantity } = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getCart);
router.get('/sync', verifyToken, syncCartToFirestore);
router.post('/add', verifyToken, addItemToCart);
router.post('/remove', verifyToken, removeItemFromCart);
router.post('/updatequantity', verifyToken, updateItemQuantity);


module.exports = router;