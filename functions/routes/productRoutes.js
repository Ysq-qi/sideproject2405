const express = require('express');
const { getProducts, getProductsByIds } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);

// 批量查詢多個產品
router.get('/ids', getProductsByIds);

module.exports = router;