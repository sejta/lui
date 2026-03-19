# Components

## Summary

`lui` focuses on compact Vue primitives for product UI rather than a large kitchen-sink component catalog.

The current package is strongest in:

- forms and simple controls
- surfaces and grouped content
- overlays and menus
- lightweight navigation
- toast feedback

## Stable Component Surface

These are the main reusable components exposed today.

### Actions and Inputs

- `UiButton`: button with `primary`, `secondary`, and `ghost` variants
- `UiInput`: text-like input with `modelValue`
- `UiTextarea`: multiline text input

### Form Controls

- `UiCheckbox`: boolean checkbox control
- `UiSwitch`: boolean switch control
- `UiRadioGroup`: single-select radio group from item data
- `UiField`: wrapper for label, description, error, and control wiring

### Surfaces and Layout

- `UiCard`: generic surface container with optional interactive styling
- `UiPanel`: grouped section surface with optional header and actions
- `UiDivider`: horizontal or vertical separator

### Overlay And Menu Family

- `UiDialog`: modal surface with close controls
- `UiDropdown`: trigger-based action menu
- `UiContextMenu`: right-click menu positioned from cursor location
- `UiPopover`: floating non-modal content surface
- `UiTooltip`: short descriptive hover/focus hint

### Feedback And Navigation

- `UiToast`: single toast item
- `UiToastViewport`: mounted toast container
- `UiTabs`: tab list with controlled or uncontrolled active state

## Directional Exports

Not every export has the same maturity.

Directional or lightweight contracts at `1.0.0`:

- `UiEmptyState`
- app-shell exports from `@sejta/lui/app`

These exports document intended direction, but the main supported package value today is the stable primitive set listed above.

## Shared API Patterns

The package uses a small number of repeated API conventions.

### Value Components

Inputs and selectors follow the standard Vue pattern:

- `modelValue`
- `update:modelValue`

This applies to:

- `UiInput`
- `UiTextarea`
- `UiCheckbox`
- `UiSwitch`
- `UiRadioGroup`
- `UiTabs`

### Overlay Components

Overlays are designed to be controllable from the outside when needed:

- `open`
- `update:open`

This applies to:

- `UiDialog`
- `UiDropdown`
- `UiContextMenu`
- `UiPopover`

`UiTooltip` is intentionally lighter and manages its own visibility from hover/focus interactions.

### Slot Usage

Slots stay intentionally small:

- text and simple children usually go in the default slot
- `UiPanel` supports `header` and `actions`
- `UiDialog` supports `default` and `actions`
- trigger-based overlays expose a `trigger` slot
- `UiField` exposes control metadata through its default slot
- `UiTabs` exposes the active item through its default slot

The goal is to make composition predictable without building a large slot API matrix.

## Accessibility Expectations

Components aim to ship with sensible accessibility defaults:

- native controls are used where practical
- invalid state is reflected through `aria-invalid`
- `UiField` generates ids and wiring for labels and descriptions
- `UiTabs` exposes tablist, tab, and tabpanel roles
- `UiTooltip` uses `role="tooltip"` and `aria-describedby`
- `UiDialog` uses `role="dialog"` and `aria-modal="true"`
- toasts use polite live-region behavior through the viewport

This does not remove the consumer's responsibility to provide correct labels, titles, and content structure.

## Overlay Behavior Model

Overlay components share a common behavior contract:

- floating content renders into `body`
- placement is derived from the shared positioning layer
- Escape closes dismissible overlays
- outside click closes dropdowns, popovers, context menus, and dialogs
- dialog additionally locks body scroll while open

This shared behavior is one of the main consistency benefits of using the package instead of composing ad hoc overlay logic in each application.

## What Belongs In Consumer Apps

`lui` should provide primitives, not full product screens.

Keep these in the application instead of the library:

- route-level pages
- API-bound forms
- data tables tied to backend schemas
- dashboard widgets with product-specific logic
- domain-specific cards and settings panels

A good rule is simple: if the component mostly reflects one product's business model, it does not belong in `lui`.

## Out Of Scope For 1.0.0

The package intentionally does not include:

- complex select or combobox widgets
- date and time pickers
- tables and datagrids
- editors
- charts
- validation framework
- form state framework
- notification workflow system

These areas are expensive to maintain and should only be added with a strong real-world use case.
