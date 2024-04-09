######################################
#
#       TESTER
#
######################################
ARG NODE_VERSION 
FROM node:$NODE_VERSION-alpine3.19 AS tester
ARG NPM_VERSION 
ENV CI=true
# Add a workdir directory
WORKDIR /app
# Copy necessary files and install dependencies
COPY src /app/src
COPY .env.test \
    package*.json \
    tsconfig.json \
    tslint.json \
    vitest.config.ts \
    vitest.setup.js \
    /app/
# Update npm
RUN npm install -g npm@$NPM_VERSION && npm -v | grep $NPM_VERSION && npm install
RUN npm run test
RUN npm run prettier
######################################
#
#       COMPILER
#
######################################
FROM node:${NODE_VERSION}-alpine3.19 as compiler
# Add a workdir directory
WORKDIR /app
# Copy necessary files and install dependencies
COPY src /app/src
COPY package*.json tsconfig.json /app/
# Update npm
RUN npm install -g npm@$NPM_VERSION 
# Install dependencies
RUN npm install
# Build
RUN npm run build
######################################
#
#       BUILDER
#
######################################
FROM node:${NODE_VERSION}-alpine3.19 as builder
## Update and upgrade
RUN apk update && \
    apk add --upgrade apk-tools && \
    apk upgrade --available && \
    rm -rf /var/cache/apk/*
# Add a workdir directory
WORKDIR /app
# Copy necessary files and install dependencies
COPY --from=compiler /app/dist/App.js /app/
COPY --from=compiler /app/dist/index.js /app/
COPY --from=compiler /app/dist/package*.json /app/
COPY --from=compiler /app/dist/utils/utils.js /app/utils/utils.js
# Update npm
RUN npm install -g npm@$NPM_VERSION 
# Install dependencies
RUN npm install --omit=dev --ignore-scripts
# Compile project
# Copy file cron with scheduled script
COPY dockerfiles/production/build/docker/crontab.txt /crontab.txt
RUN /usr/bin/crontab /crontab.txt

# Copy the file to run
COPY dockerfiles/production/build/docker/cronscript.sh /app/cronscript.sh
RUN chmod a+x /app/cronscript.sh

# Copy the entrypoint
COPY dockerfiles/production/build/docker/entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

CMD ["/entrypoint.sh"]