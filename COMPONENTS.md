# Components

## Summary

`lui` focuses on compact Vue primitives for product UI rather than a large kitchen-sink component catalog.

The current package is strongest in:

- forms and simple controls
- surfaces and grouped content
- overlays and menus with keyboard navigation
- lightweight navigation
- toast and inline alert feedback
- status display

## Stable Component Surface

These are the main reusable components exposed today.

### Actions and Inputs

- `UiButton`: button with `primary`, `secondary`, and `ghost` variants; `loading` prop disables the button, shows a CSS spinner, and sets `aria-busy`
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

- `UiToast`: single toast item; supports an optional `action` with a label and `onClick` callback — clicking it runs the handler and dismisses the toast
- `UiToastViewport`: mounted toast container
- `UiAlert`: inline persistent banner with `info`, `success`, `warning`, and `danger` variants; optional `title` prop; `default` slot for message content; `actions` slot for buttons or links
- `UiTabs`: tab list with controlled or uncontrolled active state; arrow key navigation between tabs

### Status

- `UiBadge`: inline status label with semantic variants — `neutral`, `success`, `warning`, `danger`, `info`; sizes `md` and `sm`

## Directional Exports

Not every export has the same maturity.

Directional or lightweight contracts at `1.0.3`:

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
- `UiTabs` exposes tablist, tab, and tabpanel roles; arrow keys navigate between tabs; only the active tab is in the tab order
- `UiDialog` uses `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the dialog title; focus is trapped inside while open and restored to the trigger on close
- `UiDropdown` and `UiContextMenu` move focus to the first menu item on open; `ArrowDown`/`ArrowUp` navigate between items, `Home`/`End` jump to first and last
- `UiTooltip` uses `role="tooltip"` and `aria-describedby`
- toasts use polite live-region behavior through the viewport

This does not remove the consumer's responsibility to provide correct labels, titles, and content structure.

## Overlay Behavior Model

Overlay components share a common behavior contract:

- floating content renders into `body`
- placement is derived from the shared positioning layer
- Escape closes dismissible overlays
- outside click closes dropdowns, popovers, context menus, and dialogs
- dialog additionally locks body scroll while open and traps focus inside the panel
- menus move focus to the first enabled item on open

This shared behavior is one of the main consistency benefits of using the package instead of composing ad hoc overlay logic in each application.

## Menu Item API

`UiDropdown` and `UiContextMenu` accept items with the following shape:

```ts
interface UiMenuItem {
  label?: string
  value?: string
  disabled?: boolean
  type?: 'item' | 'separator'
  icon?: Component  // optional Vue component rendered before the label
}
```

The `icon` field accepts any Vue component. It renders at 1rem with `aria-hidden="true"` so screen readers skip it.

## What Belongs In Consumer Apps

`lui` should provide primitives, not full product screens.

Keep these in the application instead of the library:

- route-level pages
- API-bound forms
- data tables tied to backend schemas
- dashboard widgets with product-specific logic
- domain-specific cards and settings panels

A good rule is simple: if the component mostly reflects one product's business model, it does not belong in `lui`.

## Out Of Scope For 1.0.3

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
