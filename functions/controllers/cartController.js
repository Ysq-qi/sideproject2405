const { db } = require('../config/firebaseAdmin');

// 獲取購物車數據
exports.getCart = async (req, res) => {
  const userId = req.user.uid;

  try {
    const cartDoc = await db.collection('carts').doc(userId).get();
    if (cartDoc.exists) {
      return res.status(200).json({ items: cartDoc.data().items });
    } else {
      return res.status(200).json({ items: [] });
    }
  } catch (error) {
    console.error('Error fetching cart data:', error);
    return res.status(500).json({ error: '獲取購物車數據時出錯' });
  }
};

// 保存或更新購物車數據
exports.saveCart = async (req, res) => {
  const userId = req.user.uid;
  const cartItems = req.body.items;

  try {
    // 從 Firestore 獲取現有的購物車項目
    const cartDoc = await db.collection('carts').doc(userId).get();
    let existingItems = [];

    if (cartDoc.exists) {
      existingItems = cartDoc.data().items;
    }

    // 建立一個 Map 來合併項目
    const itemMap = new Map();

    // 先將現有的項目放入 Map
    existingItems.forEach(item => {
      itemMap.set(`${item.id}-${item.color}-${item.size}`, item);
    });

    // 將新的項目與現有項目合併
    cartItems.forEach(newItem => {
      const key = `${newItem.id}-${newItem.color}-${newItem.size}`;
      if (itemMap.has(key)) {
        // 如果商品已經存在，則疊加數量
        const existingItem = itemMap.get(key);
        existingItem.quantity += newItem.quantity;
      } else {
        // 如果商品不存在，則新增該項目
        itemMap.set(key, newItem);
      }
    });

    // 最後將合併結果轉回陣列
    const mergedItems = Array.from(itemMap.values());

    // 保存合併後的購物車數據
    await db.collection('carts').doc(userId).set({ items: mergedItems });

    return res.status(200).json({ message: '購物車已保存' });
  } catch (error) {
    console.error('Error saving cart data:', error);
    return res.status(500).json({ error: '保存購物車數據時出錯' });
  }
};

// 添加單個商品到購物車
exports.addItemToCart = async (req, res) => {
  const userId = req.user.uid;  // 從驗證後的 token 中獲取用戶 ID
  const newItem = req.body.item;  // 從請求中獲取商品信息

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

    // 使用 update 方法更新購物車，不會覆蓋整個文檔
    await db.collection('carts').doc(userId).update({ items });

    return res.status(200).json({ message: '商品已成功添加到購物車' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return res.status(500).json({ error: '添加商品到購物車時出錯' });
  }
};