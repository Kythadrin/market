FROM node:18-alpine

WORKDIR /usr/src/blockchain

COPY .env* /var/www/blockchain/
COPY Blockchain/package*.json ./

RUN npm install

COPY Blockchain/ ./

RUN npm run build
RUN npx hardhat compile

EXPOSE 8081

CMD ["npm", "run", "start"]
