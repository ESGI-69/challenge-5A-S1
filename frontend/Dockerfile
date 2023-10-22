FROM node:lts-alpine

ARG VITE_API
ENV VITE_API=$VITE_API

# install git
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# install simple http server for serving static content
RUN npm install -g http-server

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Build app
RUN npm run build

# Expose port and start application
EXPOSE 8080
CMD ["http-server", "-c-1", "--proxy", "http://localhost:8080?", "dist"]
