FROM node:latest
WORKDIR /app
COPY package.json ./
RUN npm install -g npm@8.10.0
COPY . .
CMD ["npm","start"]
