FROM node:24-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 1. Install dependencies stage
FROM base AS deps
RUN apk add --no-cache libc6-compat bash
WORKDIR /app

# Copy lockfile and workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
# Copy web package.json (and any other internal packages if they exist)
COPY apps/web/package.json ./apps/web/
# Copy scripts needed for postinstall
COPY scripts ./scripts

# Install dependencies
RUN pnpm install --frozen-lockfile

# 2. Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY . .

# Set build-time env vars
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build the project
RUN pnpm --filter web build

# 3. Production runner stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# The standalone output includes only the necessary files for production
COPY --from=builder /app/apps/web/public ./apps/web/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
# set hostname to localhost
ENV HOSTNAME="0.0.0.0"

# Note: The standalone output creates a 'server.js' in the root of the standalone folder
# but for monorepos, it's often in apps/web/server.js
CMD ["node", "apps/web/server.js"]
