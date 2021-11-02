# build from top level

FROM node:14-alpine3.12 as build-frontend

WORKDIR /app
COPY ./frontend ./
RUN npm ci
RUN npm run build


FROM nginx:1.21.3-alpine

WORKDIR /app
COPY --from=build-frontend /app/build .
COPY ./proxy/nginx.prod.conf /etc/nginx/conf.d/default.conf
COPY ./proxy/shared /etc/nginx/shared
EXPOSE 8080