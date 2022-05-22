FROM node:14.15.0

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . ./

EXPOSE 3001

CMD ["npm", "start"]