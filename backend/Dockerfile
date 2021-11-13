FROM node:14-alpine3.12 as build

WORKDIR /src
COPY . ./
RUN npm ci
RUN npm run generate
RUN npm run build


FROM node:14-alpine3.12 as build-deps

WORKDIR /src
COPY --from=build /src/build .
RUN npm ci --production


FROM node:14-alpine3.12

WORKDIR /app

COPY --chown=node:node --from=build-deps /src .
ENV NODE_ENV production
ENV SERVER_PORT=4001
EXPOSE 4001

USER node

CMD ["node", "src/index.js"]