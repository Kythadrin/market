FROM node:18-alpine

WORKDIR /var/www/blockchain

COPY ./Blockchain/package*.json ./

RUN npm install

COPY ./Blockchain/* .

EXPOSE 8081

CMD ["npm", "run", "start"]
