FROM node:alpine AS build

WORKDIR /usr/frontend

COPY . /usr/frontend

RUN npm ci

RUN npm run build

FROM nginx

EXPOSE 3333

COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/frontend/dist /usr/share/nginx/html

