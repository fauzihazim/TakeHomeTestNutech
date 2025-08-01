FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=3000
EXPOSE $PORT

CMD ["sh", "-c", "npm start -- --port=${PORT}"]