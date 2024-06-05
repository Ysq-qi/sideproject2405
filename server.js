const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.get('/', (req, res) => {
  res.send('success');
});

// 獲取所有 products 相關數據
app.get('/api/products/all', (req, res) => {
  const categories = ['jackets', 'shirts', 'pants', 'tops', 'accessories'];
  const allProducts = [];

  categories.forEach(category => {
    const filePath = path.join(__dirname, `data/product/${category}.json`);
    console.log(`Reading file: ${filePath}`);
    const data = JSON.parse(fs.readFileSync(filePath));
    if (Array.isArray(data)) {
      allProducts.push(...data);
    } else {
      console.error(`Data from ${filePath} is not an array.`);
    }
  });

  res.json(allProducts);
});

// 獲取所有 home 相關數據
app.get('/api/home/all', (req, res) => {
  const sections = ['banner', 'featured', 'focusproduct', 'newproduct'];
  const allHomeData = [];

  sections.forEach(section => {
    const filePath = path.join(__dirname, `data/home/${section}.json`);
    console.log(`Reading file: ${filePath}`);
    const data = JSON.parse(fs.readFileSync(filePath));
    allHomeData.push(...data);
  });

  res.json(allHomeData);
});

// 獲取單個 products 分類數據
app.get('/api/products/:category', (req, res) => {
  const category = req.params.category;
  const filePath = path.join(__dirname, `data/product/${category}.json`);

  try {
    const data = JSON.parse(fs.readFileSync(filePath));
    res.json(data);
  } catch (error) {
    console.error(`Error reading file: ${filePath}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 獲取指定 productIds 的產品數據
app.get('/api/products', (req, res) => {
  const ids = req.query.ids.split(',');
  const categories = ['jackets', 'shirts', 'pants', 'tops', 'accessories'];
  let allProducts = [];

  categories.forEach(category => {
    const filePath = path.join(__dirname, `data/product/${category}.json`);
    const data = JSON.parse(fs.readFileSync(filePath));
    const filteredProducts = data.filter(product => ids.includes(product.id));
    allProducts = allProducts.concat(filteredProducts);
  });

  res.json(allProducts);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// 獲取單個 home 分類數據
app.get('/api/home/:section', (req, res) => {
  const section = req.params.section;
  const filePath = path.join(__dirname, `data/home/${section}.json`);

  try {
    const data = JSON.parse(fs.readFileSync(filePath));
    res.json(data);
  } catch (error) {
    console.error(`Error reading file: ${filePath}`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});