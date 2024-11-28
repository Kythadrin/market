FROM node:18-alpine

WORKDIR /usr/src/bot

COPY Blockchain/package*.json ./

RUN npm install

COPY Blockchain/ ./

EXPOSE 8080

CMD ["ts-node", "src/index.ts"]