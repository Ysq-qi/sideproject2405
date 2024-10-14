const express = require('express');
const { getBannerProduct, getFeaturedProduct, getFocusProduct, getNewProduct } = require('../controllers/homeController');

const router = express.Router();

router.get('/banner', getBannerProduct);
router.get('/featured', getFeaturedProduct);
router.get('/focusproduct', getFocusProduct);
router.get('/newproduct', getNewProduct);

module.exports = router;