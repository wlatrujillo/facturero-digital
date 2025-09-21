FROM node:14.16.0-alpine3.13

RUN addgroup app && adduser -S -G app app
RUN mkdir /app && chown -R app:app /app
RUN touch /tmp/openssl.cnf
USER app

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

CMD ["node","server"]