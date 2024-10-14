const { db } = require('../config/firebaseAdmin');

// 獲取所有橫幅數據
exports.getBannerProduct = async (req, res) => {
  try {
    const bannerSnapshot = await db.collection('home').where('id', 'in', ['banner001', 'banner002', 'banner003', 'banner004', 'banner005']).get();
    const banners = [];
    bannerSnapshot.forEach(doc => {
      banners.push(doc.data());
    });
    res.status(200).json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 獲取所有特色商品數據
exports.getFeaturedProduct = async (req, res) => {
  try {
    const snapshot = await db.collection('home').where('id', 'in', ['featured001', 'featured002', 'featured003']).get();
    const featuredProducts = [];
    snapshot.forEach(doc => {
      featuredProducts.push(doc.data());
    });
    res.status(200).json(featuredProducts);
  } catch (error) {
    console.error('Error getting featured products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 獲取注目商品數據
exports.getFocusProduct = async (req, res) => {
  try {
    const doc = await db.collection('home').doc('focus001').get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Focus product not found' });
    }
    res.status(200).json(doc.data());
  } catch (error) {
    console.error('Error getting focus product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 獲取新品數據
exports.getNewProduct = async (req, res) => {
  try {
    const doc = await db.collection('home').doc('new001').get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'New products not found' });
    }
    res.status(200).json(doc.data());
  } catch (error) {
    console.error('Error getting new products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};