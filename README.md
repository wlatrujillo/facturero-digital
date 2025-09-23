# Facturero Digital


## Facturero Web

Angular Application


## Facturero API

Node - Express Application

Mongo DB

## Installation

### Requirements

* Docker
* NodeJS >= 20

### Docker compose

Requires .env file
```env
mongo_data_path=D:\mongo_data
mongo_root_password=YourPassword
```

```shell
docker-compose up
```

### Mongo DB local 

```
docker run --name facturero-mongodb -p 27017:27017 -v ./mongodb-data:/docker-entrypoint-initdb.d:ro -d mongo:8.0
```
