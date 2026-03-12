# Styles

## Goal

The style system should be small, readable, and practical for shipping products quickly.

It is based on plain CSS with a few clear layers instead of a large design-token platform.

## CSS Foundation Layers

### `tokens.css`

Defines core variables:

- spacing
- radius
- typography scale
- shadow levels
- z-index levels
- neutral semantic aliases

### `themes.css`

Maps semantic variables for themes.

For v0.1, only the structure is defined. Final brand colors are intentionally undecided.

### `base.css`

Holds reset and sensible defaults:

- box sizing
- body and typography defaults
- form element inheritance
- media defaults

### `layout.css`

Defines layout primitives and shell helpers:

- stack
- cluster
- sidebar-shell hooks
- content bounds

### `utilities.css`

Holds a very small utility layer. It should stay limited to recurring patterns that are awkward to repeat in component CSS.

### `motion.css`

Defines motion tokens and conventions, including reduced-motion behavior.

## Styling Principles

- Prefer semantic CSS custom properties over hard-coded values
- Keep utility classes few and intentional
- Avoid framework-wide visual commitments too early
- Let components consume tokens instead of redefining local scales
- Keep motion subtle and optional

## Theming Direction

The initial architecture supports theme variables but does not lock branding.

Planned baseline:

- one default light theme
- one future dark theme
- semantic aliases for surface, text, border, accent, focus

## v0.1 Out of Scope

- token build pipeline
- CSS-in-JS
- per-component visual polish
- multiple product themes
- generated design token artifacts
