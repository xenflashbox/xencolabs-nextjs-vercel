# --- base ---
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

# --- builder ---
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NPM_CONFIG_PRODUCTION=false
COPY package.json pnpm-lock.yaml* package-lock.json* yarn.lock* ./
RUN set -eux;   if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile;   elif [ -f yarn.lock ]; then yarn install --frozen-lockfile;   elif [ -f package-lock.json ]; then npm ci;   else npm install; fi
COPY . .
RUN set -eux;   if [ -f pnpm-lock.yaml ]; then pnpm build;   elif [ -f yarn.lock ]; then yarn build;   else npm run build; fi

# --- runner ---
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache curl
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node","node_modules/next/dist/bin/next","start","-p","3000"]
