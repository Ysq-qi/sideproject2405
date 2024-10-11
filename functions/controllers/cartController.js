const { db } = require('../config/firebaseAdmin');

// 獲取 Firestore 的購物車清單數據
exports.getCart = async (req, res) => {
  const userId = req.user.uid;

  try {
    const cartDoc = await db.collection('carts').doc(userId).get();
    if (cartDoc.exists) {
      return res.status(200).json({ success: true, items: cartDoc.data().items, message: '獲取購物車成功' });
    } else {
      return res.status(200).json({ success: true, items: [], message: '購物車為空' });
    }
  } catch (error) {
    console.error('Error fetching cart data:', error);
    return res.status(500).json({ success: false, error: '獲取購物車數據時出錯' });
  }
};

// 將合併的購物車清單同步至 Firestore
exports.syncCartToFirestore = async (req, res) => {
  const userId = req.user.uid;
  const { items } = req.body; // 接收從前端發送的購物車數據

  try {
    // 保存或更新購物車到 Firestore
    await db.collection('carts').doc(userId).set({ items });
    return res.status(200).json({ success: true, items, message: '購物車已同步到 Firestore' });
  } catch (error) {
    console.error('Error syncing cart to Firestore:', error);
    return res.status(500).json({ success: false, error: '同步購物車到 Firestore 時出錯' });
  }
};

// 添加單個商品到購物車
exports.addItemToCart = async (req, res) => {
  const userId = req.user.uid; // 從驗證後的 token 中獲取用戶 ID
  const newItem = req.body.item; // 從請求中獲取商品信息

  try {
    // 確保 newItem 沒有 undefined 的字段
    const cleanNewItem = Object.fromEntries(
      Object.entries(newItem).filter(([key, value]) => value !== undefined)
    );

    // 從 Firestore 獲取現有的購物車文檔
    const cartDoc = await db.collection('carts').doc(userId).get();
    let items = [];

    if (cartDoc.exists) {
      // 如果購物車文檔已存在，則取出現有的 items
      items = cartDoc.data().items;
    }

    // 查找購物車中是否已有該商品
    const existingItemIndex = items.findIndex(
      i => i.id === cleanNewItem.id && i.color === cleanNewItem.color && i.size === cleanNewItem.size
    );

    if (existingItemIndex !== -1) {
      // 如果商品已經存在，則增加數量
      items[existingItemIndex].quantity += cleanNewItem.quantity;
    } else {
      // 如果商品不存在，則將其添加到購物車中
      items.push(cleanNewItem);
    }

    // 使用 set 方法更新購物車，確保文檔存在
    await db.collection('carts').doc(userId).set({ items });

    return res.status(200).json({ success: true, items, message: '商品已成功添加到購物車' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return res.status(500).json({ success: false, error: '添加商品到購物車時出錯' });
  }
};

// 刪除購物車中的商品
exports.removeItemFromCart = async (req, res) => {
  const userId = req.user.uid;
  const { id, color, size } = req.body; // 根據 id, color, size 來刪除對應的商品

  try {
    // 獲取現有的購物車數據
    const cartDoc = await db.collection('carts').doc(userId).get();
    if (!cartDoc.exists) {
      return res.status(404).json({ success: false, error: '購物車不存在' });
    }

    let items = cartDoc.data().items;

    // 刪除符合條件的商品
    items = items.filter(item => item.id !== id || item.color !== color || item.size !== size);

    // 更新購物車
    await db.collection('carts').doc(userId).set({ items });
    return res.status(200).json({ success: true, items, message: '商品已成功從購物車中刪除' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return res.status(500).json({ success: false, error: '刪除購物車商品時出錯' });
  }
};

// 更新購物車中商品的數量
exports.updateItemQuantity = async (req, res) => {
  const userId = req.user.uid;
  const { id, color, size, quantity } = req.body;

  try {
    // 獲取現有的購物車數據
    const cartDoc = await db.collection('carts').doc(userId).get();
    if (!cartDoc.exists) {
      return res.status(404).json({ success: false, error: '購物車不存在' });
    }

    let items = cartDoc.data().items;

    // 查找對應商品並更新數量
    const itemIndex = items.findIndex(
      i => i.id === id && i.color === color && i.size === size
    );
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, error: '商品未在購物車中找到' });
    }

    items[itemIndex].quantity = quantity;

    // 更新購物車
    await db.collection('carts').doc(userId).set({ items });
    return res.status(200).json({ success: true, items, message: '商品數量已更新' });
  } catch (error) {
    console.error('Error updating item quantity:', error);
    return res.status(500).json({ success: false, error: '更新商品數量時出錯' });
  }
};