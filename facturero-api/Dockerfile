# **Stage 1: Build Stage**
FROM node:20.19.5-alpine3.22 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# **Stage 2: Production Stage**
FROM node:20.19.5-alpine3.22 AS final

RUN addgroup app && adduser -S -G app app
RUN mkdir /app && chown -R app:app /app
USER app

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./

# Install only production dependencies
RUN npm ci

EXPOSE 8080

COPY .env ./

CMD ["node","server.js"]