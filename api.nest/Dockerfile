FROM node:14-alpine As production
RUN apk add --no-cache tzdata

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Creates a "dist" folder with the production build
RUN npm run build

ENV TZ Europe/Moscow
ENV DOCKER 1
ENV NODE_ENV production
USER node

# Start the server using the production build
CMD [ "node", "dist/main.js" ]