# 使用 Node.js 基礎映像檔
FROM node:20

# 設置工作目錄為 /app
WORKDIR /app

# 複製專案的 package.json 與 package-lock.json
COPY package*.json ./

# 安裝根目錄（如果有）的依賴
RUN npm install

# 複製整個專案檔案到容器內
COPY . .

# 分別安裝前端和後端的依賴

# 1. 安裝前端依賴
WORKDIR /app/src
RUN npm install

# 2. 安裝後端依賴
WORKDIR /app/functions
RUN npm install

# 回到根目錄
WORKDIR /app

# 容器啟動時運行的指令（可以根據需要調整）
CMD ["npm", "start"]

# 前端打包階段
FROM node:20 AS build-frontend
WORKDIR /app/src
COPY src/package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 最終映像檔
FROM node:16
WORKDIR /app
COPY --from=build-frontend /app/src/build ./build
COPY . .
RUN npm install
CMD ["npm", "start"]

