const { db, bucket, FieldValue } = require('../functions/config/firebaseAdmin');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * 上傳數據到 Firestore 集合
 * @param {string} collectionName - 集合名稱
 * @param {string} filePath - 本地 JSON 文件路徑
 */
const uploadData = async (collectionName, filePath) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const collectionRef = db.collection(collectionName);

    // 批次操作初始化
    const batch = db.batch();

    for (const item of data) {
      const docId = item.id;
      const docRef = collectionRef.doc(docId);
      const existingDoc = await docRef.get();

      if (item.images) {
        for (let image of item.images) {
          if (!image.url) {
            console.error(`Image URL is undefined for item ${item.id}, skipping this image.`);
            continue;
          }

          const localImagePath = path.join(__dirname, '..', 'public', image.url);
          const storagePath = `public/${image.url}`;

          try {
            // 計算本地圖片哈希值
            const localFileHash = await getFileHash(localImagePath);

            // 檢查圖片是否已經存在於 Storage 中
            const file = bucket.file(storagePath);
            const [exists] = await file.exists();

            if (exists) {
              // 獲取 Storage 中圖片的哈希值
              const [metadata] = await file.getMetadata();
              const remoteFileHash = metadata.metadata ? metadata.metadata.fileHash : null;

              if (remoteFileHash === localFileHash) {
                console.log(`Image at path: ${storagePath} is up-to-date, skipping upload.`);
              } else {
                console.log(`Image at path: ${storagePath} has changed, uploading new version.`);
                await uploadImageToStorage(localImagePath, storagePath, localFileHash);
              }
            } else {
              console.log(`Image does not exist at path: ${storagePath}, uploading.`);
              await uploadImageToStorage(localImagePath, storagePath, localFileHash);
            }

            // 無論圖片是否已經存在，都要更新 Firebase 中的圖片路徑為 Storage URL
            image.url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(storagePath)}?alt=media`;

          } catch (err) {
            console.error(`Failed to process image at ${localImagePath}:`, err);
            continue; // 跳過此圖片，繼續處理下一個
          }
        }
      }

      if (existingDoc.exists) {
        console.log(`Document with ID ${docId} already exists, updating...`);
        batch.set(docRef, item, { merge: true }); // 使用 merge: true 進行部分更新
      } else {
        batch.set(docRef, item);
      }
    }

    await batch.commit();
    console.log(`${filePath} data uploaded to ${collectionName} collection successfully`);
  } catch (error) {
    console.error(`Error uploading ${filePath} data: `, error);
  }
};

/**
 * 上傳圖片到 Firebase Storage
 * @param {string} localPath - 本地圖片路徑
 * @param {string} storagePath - Storage 目標路徑
 * @param {string} fileHash - 圖片的哈希值
 * @returns {Promise<string>} - 返回圖片的下載 URL
 */
const uploadImageToStorage = async (localPath, storagePath, fileHash) => {
  try {
    await bucket.upload(localPath, {
      destination: storagePath,
      metadata: {
        metadata: {
          fileHash: fileHash,
        },
      },
    });
    const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(storagePath)}?alt=media`;
    return downloadUrl;
  } catch (error) {
    console.error(`Error uploading image ${localPath}: `, error);
    throw error;
  }
};

/**
 * 計算文件的 SHA256 哈希值
 * @param {string} filePath - 文件路徑
 * @returns {Promise<string>} - 返回哈希值
 */
const getFileHash = (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);

    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
};

// 上傳 home 和 product 資料
uploadData('home', path.join(__dirname, '../data/home/banner.json'));
uploadData('home', path.join(__dirname, '../data/home/featured.json'));
uploadData('home', path.join(__dirname, '../data/home/focusproduct.json'));
uploadData('home', path.join(__dirname, '../data/home/newproduct.json'));
uploadData('product', path.join(__dirname, '../data/product/accessories.json'));
uploadData('product', path.join(__dirname, '../data/product/jackets.json'));
uploadData('product', path.join(__dirname, '../data/product/pants.json'));
uploadData('product', path.join(__dirname, '../data/product/shirts.json'));
uploadData('product', path.join(__dirname, '../data/product/tops.json'));