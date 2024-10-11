const express = require('express');
const { submitOrder, getOrders } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/submitorder', verifyToken, submitOrder);
router.get('/', verifyToken, getOrders);

module.exports = router;