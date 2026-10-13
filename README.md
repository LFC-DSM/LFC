# lfc

A pnpm monorepo containing `backend` and `frontend` apps.

## Initialization

Install the right Node version with [nvm](https://github.com/nvm-sh/nvm) or
[fnm](https://github.com/Schniz/fnm), then activate the right pnpm version via
[Corepack](https://nodejs.org/api/corepack.html):

```bash
fnm use        # or: nvm use
corepack enable
pnpm install   # also installs git hooks (Husky)
```

See `AGENTS.md` for detailed setup instructions and project conventions.

## Getting Started

Install all dependencies from the root:

```bash
pnpm install
```

## Scripts

All scripts run from the repo root.

| Script              | Description                      |
| ------------------- | -------------------------------- |
| `pnpm dev`          | Start all apps in parallel       |
| `pnpm build`        | Build all apps                   |
| `pnpm lint`         | Lint all apps                    |
| `pnpm format`       | Format all files with Prettier   |
| `pnpm format:check` | Check formatting without writing |

To target a specific app:

```bash
pnpm --filter backend dev
pnpm --filter frontend build
```

## Dependency Management

Shared tool versions are declared in the `catalog` block of `pnpm-workspace.yaml`:

```yaml
catalog:
  prettier: ^3.4.2
  eslint: ^9.0.0
```

Apps reference them with `"prettier": "catalog:"` in their `package.json`. Update a version once in `pnpm-workspace.yaml` and it applies everywhere.

### Adding a New App

1. Create `apps/<name>/package.json` with `"name": "<name>"`.
2. Reference shared tools with `catalog:`.
3. Add app-specific `eslint.config.js`.
4. Run `pnpm install` from the root — pnpm picks up the new workspace automatically.
