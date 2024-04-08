# Use a base image with Node.js and npm installed
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Change directory to library/database and run docker-compose up
RUN cd libs/database && docker-compose up -d

# Change directory back to the working directory
WORKDIR /app

# Serve the server application with Nx
CMD npm run nx serve server --verbose & \
    # Change directory to apps/client and install dependencies
    cd apps/client && npm install && \
    # Start the client application
    npm start
