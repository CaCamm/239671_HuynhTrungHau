# Sử dụng Node.js phiên bản LTS nhẹ
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các thư viện phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn của backend vào container
COPY . .

# Mở cổng 5000 cho backend API
EXPOSE 5000

# Lệnh khởi chạy server
CMD ["node", "server.js"]