const fs = require('fs');
const path = require('path');
const db = require('../src/config/firebaseAdmin');

const uploadData = async (collectionName, filePath) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const collectionRef = db.collection(collectionName);

    await Promise.all(data.map(async (item) => {
      const docId = item.id;  // 使用 JSON 中的 id 作為文檔 ID
      await collectionRef.doc(docId).set(item);  // 使用 set 方法指定文檔 ID
    }));

    console.log(`${filePath} data uploaded to ${collectionName} collection successfully`);
  } catch (error) {
    console.error(`Error uploading ${filePath} data: `, error);
  }
};

// 上傳 home 資料
uploadData('home', path.join(__dirname, '../data/home/banner.json'));
uploadData('home', path.join(__dirname, '../data/home/featured.json'));
uploadData('home', path.join(__dirname, '../data/home/focusproduct.json'));
uploadData('home', path.join(__dirname, '../data/home/newproduct.json'));

// 上傳 product 資料
uploadData('product', path.join(__dirname, '../data/product/accessories.json'));
uploadData('product', path.join(__dirname, '../data/product/jackets.json'));
uploadData('product', path.join(__dirname, '../data/product/pants.json'));
uploadData('product', path.join(__dirname, '../data/product/shirts.json'));
uploadData('product', path.join(__dirname, '../data/product/tops.json'));