FROM node:lts-alpine AS build

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3332

RUN npm run build

FROM build AS setup-prisma

RUN npx prisma generate

FROM setup-prisma AS deploy

CMD ["npm", "run", "start:prod"]