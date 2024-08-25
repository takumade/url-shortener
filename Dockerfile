# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install any needed dependencies
RUN npm install

# Copy the current directory contents into the container, except the 'frontend' folder
COPY . .

# Ignore the 'frontend' folder
RUN rm -rf ./frontend

# Set environment variables
ENV PORT=3000
ENV MONGO_URL=

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
