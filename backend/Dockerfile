FROM node:22

# Arbeitsverzeichnis setzen
WORKDIR /app

# Package-Dateien kopieren und Dependencies installieren
COPY package*.json ./
RUN npm ci

# Restliche Dateien kopieren
COPY . .

# NestJS Projekt bauen
RUN npm run build

# Render setzt PORT automatisch
EXPOSE 10000

# Production Start
CMD ["node", "dist/src/main.js"]