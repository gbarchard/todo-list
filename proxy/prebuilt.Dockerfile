FROM nginx:1.21.3-alpine

WORKDIR /app
COPY ./frontend/build .
COPY ./proxy/nginx.prod.conf /etc/nginx/conf.d/default.conf
COPY ./proxy/shared /etc/nginx/shared
EXPOSE 8080