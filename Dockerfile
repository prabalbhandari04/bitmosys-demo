# Use the official PostgreSQL 13 image from Docker Hub
FROM postgres:13

# Set environment variables for PostgreSQL
ENV POSTGRES_DB bitmosys_db
ENV POSTGRES_USER admin
ENV POSTGRES_PASSWORD admin

# Expose PostgreSQL default port
EXPOSE 5432

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Copy the application code
COPY . .

# Start the application
CMD ["nx", "serve", "server"]
