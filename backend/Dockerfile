FROM node:16

WORKDIR /backend

COPY package.json /backend/

RUN npm install

COPY . /backend/

EXPOSE ${PORT}