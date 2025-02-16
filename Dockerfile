# 使用 Node.js 进行构建
FROM node:18 AS builder

WORKDIR /app

# 复制 package.json 并安装依赖
COPY package.json package-lock.json ./
RUN npm install

# 复制所有文件并构建
COPY . .
RUN npm run build

# 使用 Nginx 提供前端静态资源
FROM nginx:alpine

# 复制构建后的文件到 Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 8081 端口
EXPOSE 9091

# 运行 Nginx
CMD ["nginx", "-g", "daemon off;"]
