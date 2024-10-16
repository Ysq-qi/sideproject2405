const express = require('express');
const { getProducts, getProductsByIds, getProductsForDisplay } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);

// 批量查詢多個產品
router.get('/ids', getProductsByIds);

// 獲取展示頁面的產品（根據 banner 或 featured ID）
router.get('/display', getProductsForDisplay); 

module.exports = router;