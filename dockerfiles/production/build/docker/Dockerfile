######################################
#                                    #
#           TEST                     #
#                                    #
######################################
FROM node:18.14.0-alpine3.17 as tester
ENV NPM_VERSION=9.5.0
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
FROM node:18.14.0-alpine3.17 as builder
ENV NPM_VERSION=9.5.0
# Upgrade versions
RUN apk update && \
    apk upgrade --available --no-cache && \
    rm -rf /var/cache/apk/*
# Upgrade npm
RUN npm install -g npm@${NPM_VERSION}
# Test against versions
RUN npm -v | grep ${NPM_VERSION}
RUN node -v | grep 18.14.0
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