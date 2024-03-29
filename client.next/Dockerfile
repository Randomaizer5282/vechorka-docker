# Install dependencies only when needed
FROM node:14-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Install dependencies based on the preferred package manager
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:14-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG CLIENT_HOST=$CLIENT_HOST
ARG API_HOST=$API_HOST
ARG UPLOAD_HOST=$UPLOAD_HOST

ENV CLIENT_HOST=$CLIENT_HOST
ENV API_HOST=$API_HOST
ENV UPLOAD_HOST=$UPLOAD_HOST
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM node:14-alpine AS production
RUN apk add --no-cache tzdata

WORKDIR /app

ARG CLIENT_HOST=$CLIENT_HOST
ARG API_HOST=$API_HOST
ARG UPLOAD_HOST=$UPLOAD_HOST

ENV CLIENT_HOST=$CLIENT_HOST
ENV API_HOST=$API_HOST
ENV UPLOAD_HOST=$UPLOAD_HOST

ENV TZ Europe/Moscow

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

#COPY --from=builder /app/i18n.json ./
#COPY --from=builder /app/locales ./locales
COPY --from=builder /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]