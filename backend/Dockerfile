# # ---------- build stage ----------
# FROM node:22 AS builder
# WORKDIR /app

# # only copy package files first for better caching
# COPY package*.json ./
# RUN npm ci

# # copy rest and build
# COPY . .
# RUN npm run build

# # ---------- production stage ----------
# FROM node:22-slim AS prod
# WORKDIR /app

# # set production env
# ENV NODE_ENV=production

# # copy built app + package.json to install prod deps only
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist

# # install only production deps
# RUN npm ci

# # expose port (Render setzt PORT env, EXPOSE ist nur dokumentativ)
# EXPOSE 4000

# # use the PORT env if your app reads it; adjust path if your build outputs differ
# # Typical NestJS entry: dist/main.js (or dist/src/main.js). Replace if needed.
# CMD ["node", "dist/src/main.js"]
