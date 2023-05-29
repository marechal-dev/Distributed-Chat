FROM node:latest AS build

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

RUN npm run build

RUN npx prisma migrate dev

FROM build

CMD ["npm","run","start:prod"]