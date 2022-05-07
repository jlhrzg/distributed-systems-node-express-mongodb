# Node image with Node 16
FROM node:16.15.0-alpine3.15

# Create app directory
RUN mkdir /app

# Change working directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install of dependencies
RUN yarn install

# Copy application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Execution command
CMD ["yarn", "prod"]