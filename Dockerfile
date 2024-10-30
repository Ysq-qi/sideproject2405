# 前端 Dockerfile
FROM node:20

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json 來安裝依賴
COPY package.json package-lock.json ./

# 安裝依賴
RUN npm install

# 複製整個項目到工作目錄
COPY ./public ./public
COPY ./src ./src
COPY .env ./

# 開放端口 3000，這是 React 開發伺服器的默認端口
EXPOSE 3000

# 啟動開發伺服器
CMD ["npm", "start"]