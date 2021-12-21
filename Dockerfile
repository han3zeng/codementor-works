FROM node:16-slim as base

WORKDIR /usr/src/app

COPY package*.json ./

FROM base as prod
RUN npm ci --only=production
COPY . ./
RUN npm run build

CMD [ "npm", "start" ]
