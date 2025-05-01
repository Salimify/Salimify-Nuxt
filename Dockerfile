# --- Build Stage ---
FROM node:20-alpine AS build

# Install dependencies
RUN apk add --no-cache libc6-compat python3 make g++ git

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Nuxt for production
RUN npm run build

# --- Production Stage ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install only production deps
COPY package*.json ./
RUN npm install --omit=dev

# Copy built app
COPY --from=build /app/.output ./.output

# Optional: expose runtime ports
EXPOSE 3000

# Start Nuxt server
CMD ["node", ".output/server/index.mjs"]
