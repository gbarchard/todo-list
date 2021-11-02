FROM node:14-alpine3.12 as build-deps

WORKDIR /app
COPY . ./
RUN npm install

CMD [ "npm", "start" ]