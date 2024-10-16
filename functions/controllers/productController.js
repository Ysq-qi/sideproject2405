const { db } = require('../config/firebaseAdmin');

// 獲取商品資料 利用mainCategory,subCategory,單個ID
exports.getProducts = async (req, res) => {
  try {
    // 設置查詢起始點為 'product' 集合
    let query = db.collection('product');

    // 根據產品 ID 過濾商品
    if (req.query.id) {
      const productDoc = await query.doc(req.query.id).get();
      if (productDoc.exists) {
        return res.status(200).json([productDoc.data()]);
      } else {
        return res.status(404).json({ error: 'Product not found' });
      }
    }

    // 根據 mainCategory 過濾商品
    if (req.query.mainCategory) {
      query = query.where('mainCategory', '==', req.query.mainCategory);
    }

    // 根據 subCategory 過濾商品
    if (req.query.subCategory) {
      query = query.where('subCategory', '==', req.query.subCategory);
    }

    // 執行查詢，獲取符合條件的文檔
    const snapshot = await query.get();

    // 構造結果
    const products = [];
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 根據 IDs 獲取產品
exports.getProductsByIds = async (req, res) => {
  const ids = req.query.ids.split(','); // 支持多個IDs

  try {
    const snapshot = await db.collection('product').where('id', 'in', ids).get();
    const products = [];
    snapshot.forEach(doc => {
      products.push(doc.data());
    });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products by IDs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 獲取 banner 或 featured 對應的商品資料給ProductDisplay使用
exports.getProductsForDisplay = async (req, res) => {
  const { id } = req.query;

  try {
    // 根據 id 從 home 集合中找到對應文檔
    const homeDoc = await db.collection('home').doc(id).get();
    if (!homeDoc.exists) {
      return res.status(404).json({ error: 'Document not found.' });
    }

    const productIds = homeDoc.data().productIds;

    // 根據 productIds 查找 product 集合中的商品
    const productSnapshots = await db.collection('product')
      .where('id', 'in', productIds)
      .get();

    const products = [];
    productSnapshots.forEach(doc => products.push(doc.data()));

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getProductsForDisplay = async (req, res) => {
  const { id } = req.query;

  try {
    // 根據 id 從 home 集合中找到對應文檔
    const homeDoc = await db.collection('home').doc(id).get();
    if (!homeDoc.exists) {
      return res.status(404).json({ error: 'Document not found.' });
    }

    const productIds = homeDoc.data().productIds;

    // 根據 productIds 查找 product 集合中的商品
    const productSnapshots = await db.collection('product')
      .where('id', 'in', productIds)
      .get();

    const products = [];
    productSnapshots.forEach(doc => products.push(doc.data()));

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};