FROM node:16-stretch

WORKDIR /usr/src/app/
COPY . .
RUN rm package-lock.json

RUN npm install