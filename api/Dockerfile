FROM node

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g npm@9.2.0

COPY . .

EXPOSE 8080

CMD ["npm","run","start"]