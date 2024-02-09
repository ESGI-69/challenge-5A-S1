FROM node:lts-alpine

ARG VITE_API_DOMAIN
ENV VITE_API_DOMAIN=$VITE_API_DOMAIN
ARG VITE_API
ENV VITE_API=$VITE_API
ARG VITE_API_TIMEOUT
ENV VITE_API_TIMEOUT=$VITE_API_TIMEOUT

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

CMD ["npm", "run", "preview"]
