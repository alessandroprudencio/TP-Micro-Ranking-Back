FROM node:16-alpine

RUN apk add --no-cache bash

RUN yarn global add @nestjs/cli

WORKDIR /usr/tennis-player/tp-micro-ranking

COPY package*.json ./

RUN yarn

COPY . .
