FROM node:lts-alpine

WORKDIR /app
COPY ./package*.json ./
RUN npm ci

COPY . .

RUN chown -R node:node /app
USER node

RUN npm run build

CMD npm start
