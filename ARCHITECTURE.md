# Architecture

## Summary

`lui` is a single-package Vue 3 UI library with a deliberately flat structure.

The package is organized into four source layers:

1. `styles` for the shared CSS foundation
2. `composables` for reusable UI behavior
3. `components` for product-facing primitives
4. `app` for higher-level app-shell contracts

This layout keeps the public API small and predictable. Consumers install one package, import from a few stable entry points, and do not need to understand the internal file tree to use the library.

## Public Entry Points

These imports are the intended public surface:

- `@sejta/lui`
- `@sejta/lui/style.css`
- `@sejta/lui/styles`
- `@sejta/lui/composables`
- `@sejta/lui/components`
- `@sejta/lui/app`

`@sejta/lui` is the primary entry. It re-exports the package surface and is the default import target for most consumers.

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

- `styles` does not depend on TypeScript modules
- `composables` may depend on Vue and low-level browser APIs
- `components` may depend on `styles` and `composables`
- `app` may depend on `components`, `composables`, and `styles`
- lower layers must not import higher layers

The dependency direction is intentionally strict. It prevents app-shell code from leaking into generic controls and keeps reusable primitives portable across products.

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

The styles layer defines the shared CSS base for the whole package:

- design tokens
- theme variable mappings
- reset and element defaults
- layout helpers
- utility classes
- motion conventions

This layer is global by design. `lui` does not try to isolate every style behind CSS-in-JS or shadow DOM boundaries.

### `src/composables`

The composables layer contains behavior that is reused by multiple components:

- outside click detection
- Escape key handling
- controlled/uncontrolled state coordination
- body scroll locking
- overlay positioning
- toast state management
- focus trap for modal surfaces
- roving tabindex for keyboard navigation within groups

These modules should stay policy-light. They exist to support primitives, not to define application behavior.

### `src/components`

The components layer contains the reusable controls and surfaces that consumers are expected to use directly:

- inputs and actions
- field wrappers
- surfaces
- tabs
- overlays
- toast UI
- inline alert banners
- status badges

This is the core of the public package.

### `src/app`

The `app` layer is reserved for higher-level application structure such as shells, sidebars, and toolbars.

At `1.0.2`, this layer is still a contract layer rather than a finished set of shipped layout components. It is exported to show intended package direction, but consumers should treat it as less mature than the main component primitives.

## Current Maturity

The package does not have uniform maturity across all exports.

Shipped and usable:

- styles
- composables
- core form controls
- surface primitives
- overlay primitives with keyboard navigation
- tabs with arrow key navigation
- toast UI with optional action
- inline alert banners
- status badges

Still lightweight or directional:

- `@sejta/lui/app`
- `UiEmptyState`

That split is intentional. The stable value of `lui` today is the component and styling foundation, not a fully built app-shell framework.

## Overlay Architecture

Overlay components share a common implementation model:

- floating content is rendered through `Teleport`
- position is managed through `useOverlayPosition`
- dismiss behavior is standardized through outside-click and Escape handling
- dialog uses body scroll locking and focus trapping while open; focus returns to the trigger on close
- menus focus the first enabled item on open and support arrow key navigation between items

This keeps dropdowns, popovers, tooltips, context menus, and dialogs aligned on the same behavioral foundation instead of each component solving positioning and dismissal independently.

## API Design Rules

The package follows a small set of API rules:

- prefer explicit props over hidden global configuration
- use `modelValue` and `update:modelValue` for value-bearing inputs
- use `open` and `update:open` for controllable overlays
- pass native attributes through `attrs` when practical
- keep slot structure shallow and predictable
- default to low styling assumptions and token-driven visuals

These rules matter more than any single internal file layout. They are the main reason separate components still feel like one library.

## Extending The Library

New additions should follow the existing layering and API rules.

Add a component when:

- the pattern is already repeated across multiple products
- it can be expressed as a reusable primitive
- its API can stay small without app-specific knowledge

Keep code out of the library when:

- the behavior depends on product-specific data or workflows
- the component is mostly page composition
- the control only exists for one screen or one backend contract

In practice, `lui` should provide primitives and composition building blocks. Product screens, API wiring, routing, and domain-specific widgets belong in consuming applications.

## Deliberately Missing

The package still avoids several categories on purpose:

- runtime plugin layer
- registry system
- icon package
- token generation pipeline
- dedicated docs site
- visual regression setup
- heavy widgets without a strong use case

Those can be added later if real usage pressure justifies them. They are not prerequisites for the current library shape.
