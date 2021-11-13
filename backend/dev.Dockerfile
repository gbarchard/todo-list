FROM node:14-alpine3.12 as build

WORKDIR /app

COPY --chown=node:node . ./
RUN npm install
RUN npm run generate

ENV NODE_ENV=development
USER node

CMD [ "npm", "run", "start:dev" ]