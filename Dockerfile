FROM node:alpine

WORKDIR /app

# Install dependencies
COPY ./dist/apps/api/package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN NODE_ENV=production npm install
RUN npm install -g pm2

# Copy API
COPY ./dist/apps/api /app

# Copy UI
COPY ./dist/apps/ui /app/ui
ENV NODE_ENV=production
ENV UI_DIST_PATH=/app/ui

# Start app
EXPOSE 3000
CMD ["pm2-runtime", "main.js"]
