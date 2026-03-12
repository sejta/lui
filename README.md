# lui

`lui` is a compact internal UI framework / UI kit for future Vue 3 products.

The goal of this repository is to keep one clear foundation for:

- base styles and CSS tokens
- reusable UI behavior via composables
- a small set of product-facing components
- layout primitives for app shells

Current stage: architecture-first. No full component implementation yet.

## Current Setup

The repository currently includes:

- source architecture scaffold in `src/`
- markdown documentation for architecture and scope
- minimal TypeScript configuration for type contracts
- minimal package metadata for a future library build

## Goals

- Keep the base small and easy to maintain by one developer
- Avoid rebuilding the same UI patterns in every project
- Prefer composition, CSS primitives, and explicit structure over abstraction-heavy patterns
- Keep the public surface flat and readable

## Non-goals for v0.1

- Production-ready component implementations
- Heavy widgets like datepickers, datagrids, editors
- Monorepo, package zoo, or plugin ecosystem
- Theme system with finalized branding

## Proposed Repository Shape

```text
src/
  app/
  components/
  composables/
  styles/
  index.ts
```

See [ARCHITECTURE.md](/home/laslo/lui/ARCHITECTURE.md), [COMPONENTS.md](/home/laslo/lui/COMPONENTS.md), [STYLES.md](/home/laslo/lui/STYLES.md), and [ROADMAP.md](/home/laslo/lui/ROADMAP.md) for details.

## v0.1 Scope

Included at structure level:

- CSS foundation: tokens, themes, base/reset, layout, utilities, motion
- composables: click outside, escape, controllable state, scroll lock, overlay positioning base
- component contracts for core primitives and overlays
- app shell primitives
- one public export surface from `src/index.ts`

## Development Direction

The intended sequence after architecture approval:

1. lock token naming and CSS layering conventions
2. implement composables that power overlays and controlled inputs
3. implement low-level components first
4. build app shell and overlay components on top of the base
