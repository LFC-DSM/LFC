# lfc

A pnpm monorepo containing `backend` and `frontend` apps.

## Structure

```
lfc/
├── apps/
│   ├── backend/       # Node.js backend application
│   └── frontend/      # Frontend application (Vite)
├── package.json       # Root scripts & shared devDependencies
├── pnpm-workspace.yaml  # Workspace config, package catalog, pnpm settings
├── prettier.config.js # Global formatter config (shared by all apps)
└── .prettierignore
```

## Version management

This project pins exact versions via `package.json`:

| Tool    | Version |
| ------- | ------- |
| Node.js | 25.2.1  |
| pnpm    | 9.5.0   |

Using a mismatched version will hard-fail (`onFail: "error"`).

### Node.js

Use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) to install and switch versions:

```bash
# nvm
nvm install 25.2.1
nvm use 25.2.1

# fnm
fnm install 25.2.1
fnm use 25.2.1
```

### pnpm

Use [Corepack](https://nodejs.org/api/corepack.html) (ships with Node.js) — it reads `"packageManager"` from `package.json` and activates the correct pnpm version automatically:

```bash
corepack enable
```

After that, running any `pnpm` command in this repo will use pnpm 9.5.0. No manual installation needed.

Alternatively, install directly:

```bash
npm install -g pnpm@9.5.0
```

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
