FROM node:18.13.0-alpine3.17
# Upgrade versions
RUN apk update && apk upgrade --available
# Upgrade npm
RUN npm install -g npm@9.2.0
# Add a workdir directory
WORKDIR /app
# Copy dependedncies
COPY src /app/src/
COPY index.js /app/
COPY package*.json /app/
# Install dependencies
RUN rm -r /app/src/__tests__ && npm install --omit=dev

# Copy file cron with scheduled script
COPY dockerfiles/crontab.txt /crontab.txt
RUN /usr/bin/crontab /crontab.txt

# Copy the file to run
COPY dockerfiles/cronscript.sh /app/cronscript.sh
RUN chmod a+x /app/cronscript.sh

# Copy the entrypoint
COPY dockerfiles/entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

CMD ["/entrypoint.sh"]