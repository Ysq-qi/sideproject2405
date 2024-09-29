const express = require('express');
const { getCart,syncCartToFirestore,addItemToCart,removeItemFromCart,updateItemQuantity, submitOrder } = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getCart);
router.post('/sync', verifyToken, syncCartToFirestore);
router.post('/add', verifyToken, addItemToCart);
router.post('/remove', verifyToken, removeItemFromCart);
router.post('/updatequantity', verifyToken, updateItemQuantity);
router.post('/submitorder', verifyToken, submitOrder);

module.exports = router;