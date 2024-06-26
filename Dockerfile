FROM node:18

# Screwdriver Version
ARG VERSION=latest

# Create our application directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# update npm
RUN npm install -g npm
RUN npm cache clean -f

# Install Screwdriver API
RUN npm install screwdriver-cd-api@$VERSION
WORKDIR /usr/src/app/node_modules/screwdriver-cd-api

# Setup configuration folder
RUN ln -s /usr/src/app/node_modules/screwdriver-cd-api/config /config

# Expose the web service port
EXPOSE 8080

# Run the service
CMD [ "npm", "start" ]
