# Dockerfile
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (for caching layer)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files into the container
COPY . .

# Expose the port (adjust for each service)
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
