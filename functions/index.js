const cors = require('cors');
const functions = require("firebase-functions");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");

// 建立 Express 應用
const app = express();
app.use(cors()); // 啟用 CORS
app.use(express.json()); // 支援 JSON 請求

// 使用用戶和購物車相關的路由
app.use("/users", userRoutes);
app.use('/cart', cartRoutes);

// 將 Express 應用綁定到 Firebase Function
exports.api = functions.https.onRequest(app);
