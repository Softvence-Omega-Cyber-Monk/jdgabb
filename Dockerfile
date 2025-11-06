# Use official Node.js v24 image
FROM node:24.6.0

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your dev server runs on (adjust if needed)
EXPOSE 5000

# Start the app in development mode
CMD ["npm", "run", "dev"]