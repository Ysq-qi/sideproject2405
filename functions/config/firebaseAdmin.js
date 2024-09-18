const admin = require("firebase-admin");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccountKey.json");

// 初始化 Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
});

// 獲取 Firestore 實例
const db = getFirestore();

// 將 admin 和 db 同時導出，供其他文件使用
module.exports = { admin, db };