# --- Build Stage ---
FROM node:20-alpine AS build

# Accept build-time variable
ARG STRAPI_BACKEND
ENV STRAPI_BACKEND=$STRAPI_BACKEND

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

ARG STRAPI_BACKEND
ENV STRAPI_BACKEND=$STRAPI_BACKEND

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
