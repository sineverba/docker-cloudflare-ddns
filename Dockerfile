FROM node:16.14.2-alpine3.15
# Add a workdir directory
WORKDIR /app
# Copy dependedncies
COPY src /app/src/
COPY index.js /app/
COPY package*.json /app/
# Install dependencies
RUN rm -r /app/src/__tests__ && npm install -g npm@8.6.0 && npm install

ENTRYPOINT ["node"]
CMD ["index.js"]
