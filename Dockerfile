FROM node:lts-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm
RUN npm install -g nodemon
RUN npm install -g @babel/cli @babel/core @babel/preset-env

COPY package*.json ./

RUN pnpm install

COPY . .