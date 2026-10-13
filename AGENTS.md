# Agent Instructions

This is a **pnpm monorepo** with two apps:

| App        | Path             | Stack                                 |
| ---------- | ---------------- | ------------------------------------- |
| `backend`  | `apps/backend/`  | NestJS 10, TypeScript (CommonJS)      |
| `frontend` | `apps/frontend/` | Vite 6, React 18, TypeScript (ESNext) |

## Tools

Always use **`pnpm`** — never `npm` or `yarn`. All pnpm settings go in `pnpm-workspace.yaml` (camelCase); `.npmrc` is for auth/registry credentials only.

Run from the **repo root** unless noted:

```bash
pnpm install                  # install all workspace deps
pnpm dev                      # start all apps in parallel
pnpm build                    # build all apps
pnpm lint                     # lint all apps
pnpm format                   # format everything with Prettier
pnpm format:check             # check formatting (CI)
pnpm --filter backend dev     # target a specific app
pnpm --filter frontend build
```

## Dependency management

Shared tool versions are centralized in the `catalog` block of `pnpm-workspace.yaml`:

```yaml
catalog:
  prettier: ^3.4.2
  typescript: ^5.8.0
  typescript-eslint: ^8.0.0
  eslint: ^9.0.0
  globals: ^16.0.0
```

Reference them in any `package.json` with `"package": "catalog:"`. Do not hardcode versions for catalog-managed packages.

To add a new dep to a specific app:

```bash
pnpm --filter backend add <package>
pnpm --filter frontend add -D <package>
```

If you add a dep that will be shared (e.g. a shared linting tool), add it to the catalog in `pnpm-workspace.yaml` first and reference it with `catalog:`.

## TypeScript

The two apps have **different module systems** — do not mix configs between them.

|                          | backend                                        | frontend                                                       |
| ------------------------ | ---------------------------------------------- | -------------------------------------------------------------- |
| `module`                 | `commonjs`                                     | `ESNext` (bundler)                                             |
| `moduleResolution`       | default (node)                                 | `bundler`                                                      |
| `experimentalDecorators` | `true`                                         | —                                                              |
| `emitDecoratorMetadata`  | `true`                                         | —                                                              |
| `jsx`                    | —                                              | `react-jsx`                                                    |
| tsconfig                 | single `tsconfig.json` + `tsconfig.build.json` | project references (`tsconfig.app.json`, `tsconfig.node.json`) |

## Formatting

Prettier is configured once at the root in `prettier.config.js`. Do not create per-app Prettier configs. Settings: no semicolons, single quotes, trailing commas, 100-char line width, 2-space indent.

## Linting

Each app has its own `eslint.config.js` using ESLint 9 flat config + `typescript-eslint`. **There is no shared ESLint config** — keep them separate.

- **backend**: Node.js globals, `no-console` off, `@typescript-eslint/no-explicit-any` warn
- **frontend**: browser globals, `react-hooks`, `react-refresh` plugins

Do not add a root-level `eslint.config.js`.

## NestJS conventions (backend)

Follow the installed `nestjs-best-practices` skill. Key points:

- Organize by **feature modules**, not by technical layer (no `controllers/`, `services/` top-level dirs)
- Use **constructor injection** — never property injection or the service locator pattern
- Use **`@nestjs/common` HTTP exceptions** (`NotFoundException`, `BadRequestException`, etc.) — never throw raw `Error`
- Use a **global exception filter** for centralized error handling
- Validate all input with **class-validator + class-transformer** DTOs via `ValidationPipe`
- Avoid circular module dependencies

Generate new modules with:

```bash
pnpm --filter backend dlx @nestjs/cli generate module <name>
pnpm --filter backend dlx @nestjs/cli generate controller <name>
pnpm --filter backend dlx @nestjs/cli generate service <name>
```

## React conventions (frontend)

- Functional components only
- Keep components in `src/` organized by feature, not type
- `eslint-plugin-react-hooks` is active — satisfy the exhaustive-deps rule; do not disable it
