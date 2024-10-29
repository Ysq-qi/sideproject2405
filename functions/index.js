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
const allowedOrigins = [
  'http://localhost:3000',
  'https://ysq-qi.github.io',
  'https://ysq-qi.github.io/sideproject2405'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Cache-Control Header 設置
const cacheControl = (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  next();
};

app.use(cors(corsOptions)); // 啟用並配置 CORS
app.use(express.json()); // 支援 JSON 請求

// 使用用戶和購物車相關的路由
app.use("/users", userRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/products', cacheControl, productRoutes);
app.use('/home', cacheControl, homeRoutes);

// 將 Express 應用綁定到 Firebase Function
exports.api = functions.https.onRequest(app);