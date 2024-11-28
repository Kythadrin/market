FROM node:18-alpine

WORKDIR /usr/src/bot

COPY Bot/package*.json ./

RUN npm install

COPY Bot/ ./

RUN npm run build

EXPOSE 8082

CMD ["npm", "run", "start"]