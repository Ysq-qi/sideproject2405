const cors = require('cors');
const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const userRoutes = require("./routes/userRoutes");

// 初始化 Firebase Admin SDK
admin.initializeApp();

// 建立 Express 應用
const app = express();
app.use(cors()); // 啟用 CORS
app.use(express.json()); // 支援 JSON 請求

// 使用用戶相關的路由
app.use("/users", userRoutes);

// 將 Express 應用綁定到 Firebase Function
exports.api = functions.https.onRequest(app);