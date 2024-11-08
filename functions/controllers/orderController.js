const { db, FieldValue } = require('../config/firebaseAdmin');
const { v4: uuidv4 } = require('uuid');

// 提交訂單
exports.submitOrder = async (req, res) => {
  const { uid } = req.user;
  const {
    cartItems,
    user,
    shippingMethod,
    paymentMethod,
    invoiceType,
    note,
  } = req.body;

  try {
    // 生成唯一的訂單 ID
    const orderId = uuidv4(); // 使用 UUID 庫生成唯一的 orderId

    // 計算總金額
    const OrderTotal = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // 設置付款狀態，根據付款方式決定
    const paymentStatus = paymentMethod === '貨到付款' ? '未付款' : '已付款';

    // 建立訂單資料
    const orderData = {
      orderId,  // 訂單唯一 ID
      items: cartItems,  // 購物車中的商品列表
      userInfo: user,    // 用戶的個人資料
      createdAt: FieldValue.serverTimestamp(), // 訂單創建時間
      totalAmount: OrderTotal, // 計算的總金額
      status: '未出貨', // 訂單狀態
      shippingMethod, // 運送方式
      paymentMethod, // 付款方式
      paymentStatus, // 付款狀態
      invoiceType, // 發票資訊
      note: note || '無',
    };

    // 將訂單生成在該用戶 UID 文檔的子文檔中，使用 orderId 作為子文檔 ID
    const orderRef = db.collection('orders').doc(uid).collection('orders').doc(orderId);
    
    // 將訂單數www據寫入子文檔
    await orderRef.set(orderData);

    // 清空用戶的購物車
    await db.collection('carts').doc(uid).set({ items: [] });

    // 獲取剛剛保存的訂單數據，並返回解析過的 createdAt
    const savedOrder = await orderRef.get();
    const savedOrderData = savedOrder.data();

    res.status(200).json({ success: true, message: '訂單提交成功', order: savedOrderData });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ success: false, error: '訂單提交失敗' });
  }
};

// 獲取訂單
exports.getOrders = async (req, res) => {
  const { uid } = req.user;

  try {
    const ordersRef = db.collection('orders').doc(uid).collection('orders');
    const snapshot = await ordersRef.orderBy('createdAt', 'desc').get();

    const orders = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
      };
    });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, error: '獲取訂單資料失敗' });
  }
};