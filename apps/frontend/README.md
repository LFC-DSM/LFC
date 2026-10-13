# frontend

React frontend application built with [Vite](https://vitejs.dev/).

## Development

```bash
pnpm dev       # start dev server (http://localhost:5173)
pnpm build     # type-check + production build → dist/
pnpm preview   # preview production build locally
```

From the repo root:

```bash
pnpm --filter frontend dev
```

## Linting

Uses ESLint 9 (flat config) with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.

```bash
pnpm lint
```

## Formatting

Prettier config is inherited from the repo root (`prettier.config.js`).

```bash
pnpm format          # write
pnpm format:check    # CI check
```
