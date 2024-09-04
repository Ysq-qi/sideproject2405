const { db, admin } = require('../config/firebaseAdmin');

// 創建新用戶並初始化購物車和訂單文檔
exports.createUser = async (req, res) => {
  const { uid, email } = req.body;

  try {
    // 創建 users 集合中的用戶文檔
    const userRef = db.collection("users").doc(uid);
    await userRef.set({
      profile: {
        email: email,
        name: "",
        phone: "",
        address: "",
        birthday: "",
      },
    });

    // 創建 carts 集合中的購物車文檔
    const cartRef = db.collection("carts").doc(uid);
    await cartRef.set({
      items: [],
    });

    // 創建 orders 集合中的訂單文檔
    const orderRef = db.collection("orders").doc(uid);
    await orderRef.set({
      orders: [],
    });

    res.status(200).send({ message: "User, cart, and order documents created successfully" });
  } catch (error) {
    console.error("Error creating documents:", error);
    res.status(500).send({ error: "Failed to create documents" });
  }
};

// 更新用戶資料
exports.updateProfile = async (req, res) => {
  const { uid } = req.user; // 從 token 中獲取 UID
  const { name, birthday, phone, address } = req.body;

  try {
    const userRef = db.collection('users').doc(uid);

    // 獲取當前文檔數據
    const doc = await userRef.get();
    if (!doc.exists) {
      return res.status(404).send({ error: 'User not found' });
    }

    const currentData = doc.data().profile || {}; // 獲取當前 profile 對象

    // 合併數據保持原數據不變
    const updatedProfile = {
      ...currentData,
      name,
      birthday,
      phone,
      address,
    };

    // 更新 Firestore 中的用戶資料
    await userRef.update({
      profile: updatedProfile,
    });

    res.status(200).send({ message: '資料已更新' });
  } catch (error) {
    console.error('更新資料失敗:', error);
    res.status(500).send({ error: '資料更新失敗' });
  }
};

// 更改用戶密碼
exports.changePassword = async (req, res) => {
  const { uid } = req.user; // 從 token 中獲取 UID
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ error: "請提供新密碼" });
  }

  try {
    // 直接更新密碼
    await admin.auth().updateUser(uid, { password: newPassword });

    return res.status(200).json({ message: "密碼已更新" });
  } catch (error) {
    console.error("更改密碼失敗:", error);
    return res.status(500).json({ error: "無法更改密碼，請稍後再試" });
  }
};