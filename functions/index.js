const cors = require('cors');
const functions = require("firebase-functions");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require('./routes/productRoutes');
const homeRoutes = require('./routes/homeRoutes');

// 建立 Express 應用
const app = express();

// 配置 CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // 發送 Cookie 或驗證資訊
};

app.use(cors(corsOptions)); // 啟用並配置 CORS
app.use(express.json()); // 支援 JSON 請求

// 使用用戶和購物車相關的路由
app.use("/users", userRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/home', homeRoutes);

// 將 Express 應用綁定到 Firebase Function
exports.api = functions.https.onRequest(app);