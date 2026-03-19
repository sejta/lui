# Components

## v1.0.0 Component Set

The initial component layer is intentionally small and biased toward reusable product UI.

### Actions and Inputs

- Button
- Input
- Textarea

### Surfaces and Structure

- Card
- Panel
- Divider
- EmptyState

### Navigation and Organization

- Tabs

### Overlay and Menu Family

- Dialog
- Dropdown
- ContextMenu
- Popover
- Tooltip

### App Layout Primitives

- AppShell
- Sidebar
- Toolbar

## Layering Intent

The expected implementation order is:

1. Button, Input, Textarea, Divider
2. Card, Panel, EmptyState, Tabs
3. Dialog, Popover, Tooltip
4. Dropdown, ContextMenu
5. AppShell, Sidebar, Toolbar

This order minimizes rework because overlays depend on shared behavior, and app primitives depend on stable base components.

## Shared Expectations

All future components should aim for:

- accessible defaults
- controllable and uncontrolled usage where it matters
- low styling assumptions
- token-based styling hooks
- predictable slot and composition strategy

## Out of Scope for v1.0.0

- virtualized lists
- complex selects
- date/time pickers
- tables/datagrids
- editors
- charts
