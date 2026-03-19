# Architecture

## Summary

`lui` uses a single-package structure with four source layers:

1. `styles` for foundation CSS
2. `composables` for shared UI behavior
3. `components` for reusable UI primitives
4. `app` for product-layout primitives built on the same foundation

The architecture is intentionally flat. It avoids separate packages, feature-over-segmentation, and deep internal dependency graphs.

## Design Rules

- KISS first: prefer a small number of predictable folders
- DRY where it removes repeated UI behavior or repeated CSS decisions
- Composition over inheritance
- Public exports stay centralized
- Component APIs should be stable before implementation gets deep

## Dependency Direction

```text
styles
  ^
  |
composables
  ^
  |
components
  ^
  |
app
```

Rules:

- `styles` must not depend on TypeScript modules
- `composables` should stay UI-agnostic where possible
- `components` may use `composables` and `styles`
- `app` may use `components`, `composables`, and `styles`
- `app` should not become a dumping ground for generic controls

## Repository Structure

```text
.
├── README.md
├── ARCHITECTURE.md
├── COMPONENTS.md
├── STYLES.md
└── src
    ├── app
    ├── components
    ├── composables
    ├── styles
    └── index.ts
```

## Layer Intent

### `src/styles`

Holds the CSS foundation:

- `tokens.css` for semantic and raw tokens
- `themes.css` for theme-level token mappings
- `base.css` for reset and global element defaults
- `layout.css` for layout primitives and shell helpers
- `utilities.css` for a small utility layer
- `motion.css` for timing, easing, and reduced-motion conventions

### `src/composables`

Holds reusable UI logic with minimal policy:

- outside click detection
- escape key handling
- controlled/uncontrolled state bridging
- scroll locking
- overlay positioning contracts

Overlay contract:

- floating overlays render via teleport instead of staying inside local layout containers
- positioning is handled only through the shared `useOverlayPosition` composable
- dismissible overlays share the same close rules: outside click, Escape, and controlled open state
- overlay layers use shared z-index tokens for dropdown, popover, and dialog

### `src/components`

Holds reusable product-facing primitives:

- inputs and actions
- surfaces
- overlays
- navigation helpers
- state display

Each component lives in its own folder with a single `index.ts` contract file for now. This keeps future implementation room without forcing many files early.

### `src/app`

Holds layout primitives for full application structure:

- `AppShell`
- `Sidebar`
- `Toolbar`

These are distinct from generic components because they describe product structure rather than isolated controls.

## Export Strategy

`src/index.ts` is the only root public surface. It re-exports:

- styles entry
- composables contracts
- component contracts
- app primitive contracts

This keeps imports predictable and allows internal reorganization later with minimal downstream churn.

## What Is Deliberately Missing

- no runtime plugin layer
- no registry system
- no icon package
- no token generation pipeline
- no dedicated docs site
- no visual regression setup

These should be added only when real implementation pressure appears.
