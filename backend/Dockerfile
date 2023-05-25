FROM node:latest AS build

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

RUN npm run build

FROM build

CMD ["npm","run","start:prod"]