FROM node:18-alpine

WORKDIR /var/www/blockchain

COPY Blockchain/package*.json ./

RUN npm install

COPY Blockchain/ ./

EXPOSE 3000

CMD ["node", "src/index.ts"]