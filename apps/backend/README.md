# backend

NestJS backend application.

## Development

```bash
pnpm dev       # watch mode (nest start --watch)
pnpm start     # run compiled output
pnpm build     # compile to dist/
```

From the repo root:

```bash
pnpm --filter backend dev
```

## Linting

Uses ESLint 9 (flat config) with `typescript-eslint` and Node.js globals.

```bash
pnpm lint
```

## Formatting

Prettier config is inherited from the repo root (`prettier.config.js`).

```bash
pnpm format          # write
pnpm format:check    # CI check
```
