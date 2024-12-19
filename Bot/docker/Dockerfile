FROM node:18-alpine as build

WORKDIR /usr/src/bot

COPY Bot .

RUN npm install
RUN npm run build

EXPOSE 8082

CMD ["npm", "run", "start"]
