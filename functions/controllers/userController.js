const { db, admin } = require('../config/firebaseAdmin');
const { isProtectedAccount } = require('../utils/authHelpers');


// 前端建立用戶 後端新增firestore資料庫文檔
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
      roles: ["user"], // 默認為一般用戶
      isProtected: false
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

// 從 Firestore 中獲取用戶資料
exports.getProfile = async (req, res) => {
  const { uid } = req.user;

  try {
    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).send({ error: 'User not found' });
    }

    const userProfile = doc.data().profile || {};
    res.status(200).json({ profile: userProfile });
  } catch (error) {
    console.error('獲取個人資料失敗:', error);
    res.status(500).send({ error: '獲取個人資料失敗' });
  }
};

// 更新 Firestore 用戶資料
exports.updateProfile = async (req, res) => {
  const { uid } = req.user;
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
  const { uid } = req.user;
  const { newPassword } = req.body;

  // 檢查是否為受保護帳號
  if (await isProtectedAccount(uid)) {
    return res.status(403).json({ error: "此帳號不可執行變更密碼的行為" });
  }

  // 檢查新密碼是否有變動
  if (!newPassword) {
    return res.status(400).json({ error: "請提供新密碼" });
  }

  try {
    await admin.auth().updateUser(uid, { password: newPassword });
    return res.status(200).json({ message: "密碼已更新" });
  } catch (error) {
    console.error("更改密碼失敗:", error);
    return res.status(500).json({ error: "無法更改密碼，請稍後再試" });
  }
};

// 後端刪除用戶及其相關文檔 (deleteAccount組件)
exports.deleteUserAccount = async (req, res) => {
  const { uid } = req.user;

  // 檢查是否為受保護帳號
  if (await isProtectedAccount(uid)) {
    return res.status(403).send({ error: "此帳號不可執行刪除帳號的行為" });
  }

  try {
    // 刪除 Firestore 中的用戶資料
    const userRef = db.collection('users').doc(uid);
    const cartRef = db.collection('carts').doc(uid);
    const orderRef = db.collection('orders').doc(uid);
    
    await userRef.delete();
    await cartRef.delete();
    await orderRef.delete();

    // 刪除 Firebase Auth 中的用戶
    await admin.auth().deleteUser(uid);

    res.status(200).send({ message: '帳號已成功刪除' });
  } catch (error) {
    console.error('刪除帳號失敗:', error);
    res.status(500).send({ error: '刪除帳號失敗' });
  }
};