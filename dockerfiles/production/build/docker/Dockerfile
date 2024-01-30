######################################
#                                    #
#           BUILD                    #
#                                    #
######################################
ARG NODE_VERSION=latest
FROM node:${NODE_VERSION}-alpine3.19 as builder
# Update and upgrade
RUN apk update && \
    apk add --upgrade apk-tools && \
    apk upgrade --available && \
    rm -rf /var/cache/apk/*
# Add a workdir directory
WORKDIR /app
# Copy dependedncies
COPY src /app/src/
COPY package*.json /app/
# Clean app directory
RUN rm -r /app/src/__tests__
RUN rm -r /app/src/mocks
RUN rm -r /app/src/jest.setup.js

# Setup depedencies
RUN npm ci

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