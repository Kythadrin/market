FROM node:18-alpine

WORKDIR /usr/src/blockchain

COPY Blockchain/package*.json ./

RUN npm install

COPY Blockchain/ ./

RUN npm run build

EXPOSE 8081

CMD ["npm", "run", "start"]
