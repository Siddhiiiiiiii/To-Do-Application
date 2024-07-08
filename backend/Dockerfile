# Use the official Node.js image with LTS (Long Term Support) version
FROM node:14

# Set the working directory inside the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 (or the port your Node.js application runs on)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
