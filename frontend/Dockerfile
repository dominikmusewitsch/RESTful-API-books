# # ---------- build stage ----------
# FROM node:22 AS builder

# WORKDIR /app

# # package.json und package-lock.json kopieren
# COPY package*.json ./

# # Dependencies installieren
# RUN npm ci

# # gesamten Quellcode kopieren
# COPY . .

# # Production Build erstellen
# RUN npm run build

# # ---------- production stage ----------
# FROM node:22-alpine AS prod

# WORKDIR /app

# # Nur package.json für production dependencies kopieren
# COPY package*.json ./

# # Nur production dependencies installieren
# RUN npm ci --only=production

# # Build vom Builder kopieren
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json

# # Port für Next.js
# EXPOSE 3000

# # Production Start
# CMD ["npm", "run", "start"]
