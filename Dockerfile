# syntax=docker/dockerfile:1

FROM node:alpine

WORKDIR /app

COPY . /app/

EXPOSE 3000

RUN npm install && npm run build

CMD ["npm", "start"]