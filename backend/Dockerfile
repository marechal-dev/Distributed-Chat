FROM node:lts-alpine AS build

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

RUN npm run build

FROM build

RUN npx prisma migrate dev

CMD ["npm","run","start:prod"]