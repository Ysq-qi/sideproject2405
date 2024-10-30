# 後端 Dockerfile
# 用於構建 Firebase Functions 和啟動 Firebase 模擬器
FROM node:20

# 設置工作目錄
WORKDIR /app

# 安裝 Java（Firebase 模擬器所需）
RUN apt-get update && apt-get install -y openjdk-11-jre

# 安裝 Firebase CLI
RUN npm install -g firebase-tools

# 複製 Firebase Functions 的 package.json 和 package-lock.json 來安裝依賴
COPY functions/package.json functions/package-lock.json ./

# 安裝後端依賴
RUN npm install

# 複製整個後端項目到工作目錄
COPY ./functions ./functions
COPY .firebaserc ./
COPY firebase.json ./
COPY firestore.indexes.json ./
COPY firestore.rules ./

# 開放端口（包括 Firebase 模擬器的端口）
EXPOSE 4000 5001 8080 9000 9199 5000

# CMD 指令將在 docker-compose.yml 中指定
