FROM node:20.10.0-alpine

WORKDIR /app

# Install dependencies only when needed
COPY package.json ./
RUN yarn install

# Copy all files
COPY . .

# Build the Next.js application
RUN yarn run build

# Expose the port the app runs on
EXPOSE 4173

# Start the application
CMD ["yarn", "run", "preview"]