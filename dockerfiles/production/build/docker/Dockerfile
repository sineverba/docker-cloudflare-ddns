######################################
#                                    #
#           TEST                     #
#                                    #
######################################
ARG NODE_VERSION=20.11.0
FROM --platform=$BUILDPLATFORM node:${NODE_VERSION}-alpine3.19 as tester
ARG NPM_VERSION=10.4.0
# Upgrade npm
RUN npm install -g npm@${NPM_VERSION}
# Add a workdir directory
WORKDIR /app
# Copy dependedncies
COPY src /app/src/
COPY package*.json /app/
COPY .env.test /app/.env.test
# Install dependencies
RUN npm install
RUN npm run test
######################################
#                                    #
#           BUILD                    #
#                                    #
######################################
FROM --platform=$BUILDPLATFORM node:${NODE_VERSION}-alpine3.19 as builder
# Update and upgrade
RUN apk update && \
    apk add --upgrade apk-tools && \
    apk upgrade --available && \
    rm -rf /var/cache/apk/*
# Upgrade npm
RUN npm install -g npm@${NPM_VERSION}
# Add a workdir directory
WORKDIR /app
# Copy dependedncies
COPY src /app/src/
COPY package*.json /app/
# Install dependencies
RUN rm -r /app/src/__tests__ && npm install --omit=dev

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