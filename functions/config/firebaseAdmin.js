const admin = require("firebase-admin");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const serviceAccount = require("./serviceAccountKey.json");

// 初始化 Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'sideproject2405-b8a66.appspot.com'
});

// 獲取 Firestore,Storage 實例
const db = getFirestore();
const bucket = getStorage().bucket();


// 將 admin 和 db 以及 FieldValue 同時導出，供其他文件使用
module.exports = { admin, db, bucket, FieldValue };