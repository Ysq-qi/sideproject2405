const admin = require("firebase-admin");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");

// 根據環境條件動態加載憑證
let serviceAccountKey;

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  serviceAccountKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY); // 在生產環境中，從環境變數加載 Service Account 憑證
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS_DATA) {
  serviceAccountKey = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_DATA); // 在 Docker 環境中，從環境變數中加載 Service Account 憑證
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH) {
  serviceAccountKey = require(process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH); // 在 Docker 環境中，從 JSON 文件中加載憑證，通過設定環境變數提供路徑(也就是serviceAccountKey_docker.json)
} else {
  serviceAccountKey = require("./serviceAccountKey.json"); // 在本地開發環境中，從 JSON 文件中加載憑證
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