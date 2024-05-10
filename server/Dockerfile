FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your NestJS app is running on
EXPOSE 3000

# Command to run your NestJS application
CMD ["npm", "run", "start:dev"]
