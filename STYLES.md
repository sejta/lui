# Styles

## Summary

`lui` ships with a small global CSS foundation rather than a large theme engine.

The styling approach is built around:

- CSS custom properties
- a compact set of global layers
- theme switching through a document attribute
- component classes that consume shared tokens

The default palette uses a restrained slate-blue accent rather than a bright product color. The goal is to keep buttons, switches, focus states, and selected controls visually calm in dense application UI.

Consumers are expected to import the package stylesheet once near the frontend entry point:

```ts
import '@sejta/lui/style.css'
```

## Style Layers

The shipped stylesheet is composed from a few focused files.

### `tokens.css`

Defines the package token set, including values and semantic aliases for:

- spacing
- radius
- typography
- shadows
- borders
- focus treatment
- z-index layers
- component-level color variables

### `themes.css`

Maps token aliases for available themes.

Current themes:

- `light`
- `dark`

The light theme uses a darker slate-blue accent family. The dark theme uses a softer companion accent so active controls stay readable without glowing too hard against dark surfaces.

### `base.css`

Defines global defaults and baseline element behavior:

- box sizing
- body defaults
- typography inheritance
- form element inheritance
- media defaults

### `layout.css`

Provides package layout helpers used by surfaces and shell-oriented composition.

### `utilities.css`

Contains a deliberately small utility layer for repeated layout and spacing patterns that are awkward to duplicate in component CSS.

### `motion.css`

Defines motion tokens and reduced-motion behavior used across overlays and other interactive elements.

## Theme Switching

Theme selection is document-level and attribute-based.

```ts
document.documentElement.dataset.luiTheme = 'light'
document.documentElement.dataset.luiTheme = 'dark'
```

This keeps theme switching explicit and easy to integrate with application settings.

## Public Styling Contract

The package styling contract is intentionally small but real.

Consumers can rely on:

- the `@sejta/lui/style.css` entry
- document theme switching through `data-lui-theme`
- stable component class names prefixed with `lui-`
- data attributes used for state and variant styling
- token-driven visuals instead of hard-coded one-off values

Consumers should not rely on:

- the exact internal stylesheet file layout
- undocumented implementation selectors
- current DOM shape beyond obvious component structure

The goal is to allow visual extension without freezing every internal selector forever.

## Customization Strategy

The preferred customization path is token and cascade override, not forking package code.

Recommended approaches:

- override CSS custom properties in the application theme
- layer additional app styles after importing `@sejta/lui/style.css`
- use `class` and native attributes on components where supported
- compose primitives into product-specific wrappers inside the application

Avoid:

- patching package source directly in the app
- depending on deep internal descendants unless there is no better option
- introducing a second competing global token system for the same primitives

## Visual Principles

The package styling follows a few consistent principles:

- muted, product-oriented visual language
- restrained slate-blue accent instead of a loud brand color
- low ornament by default
- accessible contrast and focus visibility
- surfaces and controls built from shared tokens
- restrained motion

This keeps the library usable across admin tools, settings interfaces, and compact product shells without forcing a heavy brand identity.

## Consumer Responsibilities

`lui` provides a visual foundation, but applications still own:

- page-level layout composition
- brand-specific styling beyond the package theme
- responsive behavior for product-specific screens
- domain-specific visual states

The package should reduce repetitive UI work, not replace application design decisions entirely.

## Out Of Scope For 1.0.2

The style system intentionally avoids:

- token build pipelines
- generated design-token artifacts
- CSS-in-JS
- per-product theme packs
- multi-brand theme orchestration
- high-complexity animation systems

The current CSS model is optimized for shipping and maintaining a compact shared UI layer.
