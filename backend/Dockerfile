FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install


COPY src src

EXPOSE 8080
CMD [ "node", "src/index.js" ]