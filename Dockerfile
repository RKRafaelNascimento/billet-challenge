FROM node:10-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package*.json ./ 

RUN npm install

COPY . . 

EXPOSE 3000

CMD ["npm", "run", "start:dev"]