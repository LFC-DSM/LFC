FROM node:22-bookworm-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.5.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json

RUN pnpm install --frozen-lockfile --filter backend...

COPY apps/backend apps/backend

RUN pnpm --filter backend build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "apps/backend/dist/main.js"]
