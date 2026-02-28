FROM node:20-alpine

WORKDIR /frontend

# 依存は先に入れてキャッシュを効かせる
COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000
CMD ["npm","run","dev","--","--hostname","0.0.0.0","--port","3000"]