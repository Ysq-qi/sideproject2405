const admin = require("firebase-admin");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");

// 根據環境條件動態加載憑證
let serviceAccountKey;

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  // 在生產環境中，從環境變數加載 Service Account 憑證
  serviceAccountKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
} else {
  // 在本地開發環境中，從 JSON 文件中加載憑證
  serviceAccountKey = require("./serviceAccountKey.json");
}

// 初始化 Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccountKey),
  storageBucket: 'sideproject2405-b8a66.appspot.com'
});

// 獲取 Firestore 和 Storage 實例
const db = getFirestore();
const bucket = getStorage().bucket();

// 將 admin、db、bucket 和 FieldValue 導出，供其他文件使用
module.exports = { admin, db, bucket, FieldValue };