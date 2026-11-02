---
name: extract-shared-style
description: Extracts a single CSS class from DesignSurface.tsx into a typed Emotion design token. Use when the user invokes `/extract-shared-style` or asks to extract a CSS class from DesignSurface.
user-invocable: true
---

# Extract Shared Style

Extracts one CSS class from `apps/frontend/src/design/DesignSurface.tsx` into a
standalone Emotion design file, then replaces all usages across the codebase.

This project uses Emotion. Two patterns exist, chosen by how dynamic the style is:

| Pattern | When to use | Result | Usage in JSX |
|---------|-------------|--------|--------------|
| `css` object | Static styles — no variants, no boolean props, no child selectors that vary per callsite | `export const fooBarCss = css\`...\`` in `design/FooBar.tsx` | `<div css={fooBarCss}>` |
| `styled` component | Dynamic styles — boolean props, variants, child selectors, or complex responsive logic tied to component structure | `export const FooBar = styled.div<{ … }>\`...\`` in `design/FooBar.tsx` | `<FooBar prop>` |

**Real examples from this project:**
- `.eyebrow` → static → `eyeBrowCss` in `design/Eyebrow.tsx` (commit 10bc332)
- `.btn` → dynamic (primary/small variants, hover/active states) → `Btn` styled component in `design/Button.tsx` (commit 13995a6)

---

## Step 1 — Get the class name

If the user did not supply a class name after `/extract-shared-style`, ask:

> Which CSS class do you want to extract? (e.g. `badge`, `sub`, `topline`)

---

## Step 2 — Read and locate the style

Read `apps/frontend/src/design/DesignSurface.tsx`.

Find the CSS block(s) for the target class. Note:
- The primary block (e.g. `.badge { … }`)
- Any modifier blocks (e.g. `.card .badge { … }`, `.hero .badge { … }`)
- Any media-query overrides for this class

---

## Step 3 — Decide: `css` object or `styled` component?

Use **`css` object** if ALL of the following are true:
- The primary block has no dynamic values (no props, no template expressions)
- There are no modifier/context blocks that would need to move with the component
  (e.g. `.hero .badge` would be a problem — it implies context-dependent styling)
- No child selectors that differ per callsite

Use **`styled` component** if ANY of the following are true:
- The style has boolean/variant props (like `primary`, `small`, `con`, `featured`)
- It has child selectors (`h3 { … }`, `a { … }`) that are structural to the component
- Context blocks (`.parent .class`) cannot be easily moved to the callsite as a `css` prop
- It is used as an interactive element (button, link) that benefits from a component type

---

## Step 4 — Find all usages

Search the frontend `src/` for:
- `className="<classname>"` — direct single-class usage
- `className={clsx(…)}` — conditional usage involving the class
- `className="… <classname> …"` — multi-class strings

Also check if any `styled` component templates reference `.classname { }` as a child selector.

---

## Step 5 — Create the design file

**Naming convention:**
- Class `.foo-bar` → file `design/FooBar.tsx`, export `fooBarcss` (static) or `FooBar` (component)
- Class `.eyebrow` → `design/Eyebrow.tsx`, export `eyeBrowCss`
- Class `.badge` → `design/Badge.tsx`, export `badgeCss` or `Badge`

### For a `css` object:

```tsx
import { css } from '@emotion/react'

export const fooCss = css`
  /* paste the CSS properties from DesignSurface here */
`
```

### For a `styled` component:

```tsx
import styled from '@emotion/styled'

export const Foo = styled.div<{ variant?: boolean }>`
  /* paste the CSS properties from DesignSurface here */
  ${({ variant }) => variant && `color: red;`}
`
```

Choose the correct HTML tag to match the actual usage (div, span, article,
etc.). If the same class is used on multiple different tags at callsites, choose
the base and export additional variants with `.withComponent`:

```tsx
export const Foo = styled.span<{ … }>`…` // `span` is most frequently used
export const FooSpan = Foo.withComponent('span')
export const FooLink = Foo.withComponent(Link) // import Link from 'react-router-dom'
```

Do NOT use the `as` prop — it does not work with Emotion styled components in this project.

---

## Step 6 — Replace usages

For each file containing `className="… <classname> …"`:

**`css` object replacement:**
1. Add `/** @jsxImportSource @emotion/react */` at the top if not already present.
2. Add the import: `import { fooCss } from '../design/Foo'` (adjust relative path).
3. Replace `className="<classname>"` → `css={fooCss}`.
4. For multi-class strings like `className="<classname> other"`:
   - Keep `className="other"` on the element.
   - Also add `css={fooCss}` — both can coexist on the same element.

**`styled` component replacement:**
1. Add the import: `import { Foo } from '../design/Foo'`.
2. Replace the JSX element: `<div className="<classname>">` → `<Foo>`.
3. Pass boolean props for any variants that previously came from extra class names
   (e.g. `className="badge primary"` → `<Badge primary>`).
4. Move any context-specific overrides (`.auth .foo { width: 100% }`) to the
   callsite using the `css` prop: `<Foo css={{ width: '100%' }}>`.

---

## Step 7 — Remove from DesignSurface.tsx

Delete the following from `DesignSurface.tsx`:
- The primary `.classname { … }` block
- All modifier context blocks (`.parent .classname { … }`)
- Any standalone media-query overrides (`@media (…) { .classname { … } }`)

Leave behind any rules that reference the class only as a *parent* context for
other unrelated classes (those must be handled separately).

---

## Step 8 — Verify

Run a search across `apps/frontend/src/` for any remaining `className` references
to the extracted class name. There should be none (except in comments or strings
that are not rendered as class names).

If any `styled` component template in the codebase uses `.classname` as a nested
child selector, update it to use the Emotion component selector `${Foo}` instead.

Report: number of files updated, number of replacements, and confirm the class
has been fully removed from `DesignSurface.tsx`.
