# Use the official Node.js 14 Alpine image as the base image
FROM node:14-alpine

# Set the working directory inside the Docker image
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining app files to the working directory
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the port your Node.js server is listening on
EXPOSE 3000

# Specify the command to run your Node.js server
CMD ["npm", "dev"]
