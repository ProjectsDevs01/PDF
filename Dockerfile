# Use an Alpine-based Node.js image
FROM node:22-alpine

# Install necessary dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

# Set the environment variable to use the installed Chromium binary
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Set up the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 8888

# Run the application
CMD ["node", "server.js"]
