FROM node:20.19.5-alpine3.22

RUN addgroup app && adduser -S -G app app
RUN mkdir /app && chown -R app:app /app
USER app

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

CMD ["node","server.js"]