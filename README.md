# SideProject2405

## 專案簡介
SideProject2405 是一個以 **React.js** 為前端、**Firebase** 為後端的全端電子商務網站專案。
用戶可以瀏覽商品、加入購物車、下訂單以及管理個人資料等功能。本專案包含了前端與後端的開發，並且包含Firestore資料庫的同步，實現了完整的購物流程。

## 功能特色
- **用戶管理**：註冊、登入、修改個人資料、更改密碼、刪除帳號。
- **商品展示**：商品列表、商品詳情、關鍵字搜尋。
- **購物車**：添加商品、更新數量、刪除商品、同步購物車至 Firestore。
- **訂單系統**：提交訂單、查看歷史訂單，訂單資料儲存在 Firestore。
- **首頁展示**：橫幅、特色商品、新商品、注目商品。

## 技術架構

### 前端
- React.js
- Redux(Redux Toolkit)
- React Router
- Styled Components
- Firebase Authentication

### 後端
- Node.js(Express.js)
- Firebase Functions
- Firestore (NoSQL 資料庫)
- Firebase Storage

### 其他
- Git, Github
- GitHub Actions（自動化部署）
- Docker（開發環境）

## 環境設置與安裝

### 必要條件
- Node.js 20.x
- Firebase CLI
- Firebase 專案與 Google Cloud 帳號
- Docker（可選）

### 安裝步驟

1. **複製專案**
   ```bash
   git clone https://github.com/yourusername/sideproject2405.git
   cd sideproject2405
   
2. **安裝前端依賴**
   ```bash
   cd src
   npm install
   
3. **安裝後端依賴案**
   ```bash
   cd ../functions
   npm install
   
4. **Firebase 設定**
   ```bash
   firebase login
   firebase init
   
5. **啟動本地模擬器**
   ```bash
   npm start
   cd functions
   firebase emulators:start

## 測試

### 測試帳號
- 為了讓您方便測試網站功能，我們提供了一個測試帳號，您可以使用以下帳號登入並體驗所有功能：

- 帳號 (Email): chaochi905@gmail.com
- 密碼 (Password): ABCD1234
- 請注意：此帳號並不會觸發信箱密碼重製與帳號刪除功能。

### 實際運作
- 用戶也能夠自行於該網站上進行註冊的功能，執行該網站的功能，並且提供帳號刪除功能，確保用戶於資料庫當中的資料能夠確實清除，不留下任何資料。

## 聯絡方式
- 如有任何疑問或建議，請透過 jacky55321261@gmail.com 與我聯繫。