# lui

`lui` is a compact Vue 3 UI library for internal products, settings screens, admin panels, overlays, and small app shells.

It is intentionally small:

- reusable product-facing primitives
- muted visual direction
- flat public API
- minimal dependencies
- no form framework
- no heavy widgets without a real use-case

## What It Includes

Current component set:

- actions and inputs: `UiButton`, `UiInput`, `UiTextarea`
- form controls: `UiCheckbox`, `UiSwitch`, `UiRadioGroup`, `UiField`
- surfaces and structure: `UiCard`, `UiPanel`, `UiDivider`, `UiEmptyState`
- overlays: `UiDialog`, `UiDropdown`, `UiContextMenu`, `UiPopover`, `UiTooltip`
- feedback: `UiToast`, `UiToastViewport`
- navigation and app UI: `UiTabs`, app shell primitives

Current composables:

- `useClickOutside`
- `useEscape`
- `useControllableState`
- `useScrollLock`
- `useOverlayPosition`
- `useToast`

## Installation

Choose the dependency source based on how you plan to use `lui`.

For local development with a sibling repository:

```json
{
  "dependencies": {
    "@sejta/lui": "file:../lui"
  }
}
```

In a monorepo:

```json
{
  "dependencies": {
    "@sejta/lui": "workspace:*"
  }
}
```

From GitHub by release tag:

```json
{
  "dependencies": {
    "@sejta/lui": "github:sejta/lui#v0.1.0"
  }
}
```

Recommended usage:

- use `file:../lui` only for local development
- use `workspace:*` if app and library live in one monorepo
- use a GitHub tag or package registry for reproducible deploys

Then run `npm install` in the consumer frontend project as usual.

## Basic Usage

Recommended import pattern:

```ts
import '@sejta/lui/style.css'
import { UiButton, UiInput, UiPanel } from '@sejta/lui'
```

`@sejta/lui` root export also imports styles internally, but explicit `@sejta/lui/style.css` is the cleaner consumer setup because it makes style loading obvious.

Example:

```ts
import { defineComponent, h, ref } from 'vue'
import '@sejta/lui/style.css'
import { UiButton, UiInput, UiPanel } from '@sejta/lui'

export default defineComponent({
  setup() {
    const name = ref('')

    return () =>
      h(UiPanel, { title: 'Profile' }, {
        default: () => [
          h(UiInput, {
            modelValue: name.value,
            placeholder: 'Alex Mercer',
            'onUpdate:modelValue': (value: string) => {
              name.value = value
            },
          }),
          h(UiButton, null, () => 'Save'),
        ],
      })
  },
})
```

## Styling And Theme

`lui` ships with global CSS tokens and utility styles.

Theme switching is currently attribute-based:

```ts
document.documentElement.dataset.luiTheme = 'light'
document.documentElement.dataset.luiTheme = 'dark'
```

Available themes right now:

- `light`
- `dark`

Style entry:

- [`@sejta/lui/style.css`](./dist/style.css)

## Overlay Components

Overlay family uses the same positioning foundation.

- `UiDropdown`: trigger-based menu
- `UiContextMenu`: right-click menu from cursor position
- `UiPopover`: compact floating content
- `UiTooltip`: short non-interactive hint
- `UiDialog`: modal surface

The shared positioning layer is exposed through:

- `useOverlayPosition`

## Toast Usage

Toast is intentionally minimal: no actions, no promise API, no notification framework.

Mount one viewport near the app root:

```ts
import { UiToastViewport } from '@sejta/lui'
```

```ts
h('div', [
  h(UiToastViewport),
  h(AppRoot),
])
```

Trigger toasts programmatically:

```ts
import { showToast } from '@sejta/lui'

showToast({
  type: 'success',
  title: 'Changes saved',
  description: 'Project settings were updated successfully.',
})
```

Available toast types:

- `success`
- `info`
- `warning`
- `error`

Toast helpers:

- `showToast(...)`
- `dismissToast(id)`
- `clearToasts()`
- `useToast()`

## Field And Form Controls

Use `UiField` as the common wrapper for:

- label
- description
- error
- control slot

Typical pattern:

```ts
h(UiField, {
  label: 'Release rules',
  description: 'Confirm before publishing.',
  error: approved.value ? '' : 'You must confirm first.',
}, {
  default: ({ controlId, labelledBy, describedBy, invalid }) =>
    h(UiCheckbox, {
      id: controlId,
      modelValue: approved.value,
      invalid: Boolean(invalid),
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
      'onUpdate:modelValue': (value: boolean) => {
        approved.value = value
      },
    }, () => 'I reviewed the checklist'),
})
```

## Component Cheatsheet

Quick reminders for the most common primitives.

### UiButton

```ts
h(UiButton, null, () => 'Primary')
h(UiButton, { variant: 'secondary' }, () => 'Secondary')
h(UiButton, { variant: 'ghost', size: 'sm' }, () => 'Ghost')
```

### UiInput

```ts
h(UiInput, {
  modelValue: email.value,
  placeholder: 'team@example.com',
  'onUpdate:modelValue': (value: string) => {
    email.value = value
  },
})
```

### UiTextarea

```ts
h(UiTextarea, {
  modelValue: notes.value,
  rows: 4,
  'onUpdate:modelValue': (value: string) => {
    notes.value = value
  },
})
```

### UiCheckbox

```ts
h(UiCheckbox, {
  modelValue: enabled.value,
  'onUpdate:modelValue': (value: boolean) => {
    enabled.value = value
  },
}, () => 'Enable notifications')
```

### UiSwitch

```ts
h(UiSwitch, {
  modelValue: compactMode.value,
  'onUpdate:modelValue': (value: boolean) => {
    compactMode.value = value
  },
}, () => 'Compact mode')
```

### UiRadioGroup

```ts
h(UiRadioGroup, {
  modelValue: appearance.value,
  items: [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ],
  'onUpdate:modelValue': (value: string) => {
    appearance.value = value
  },
})
```

### UiField

```ts
h(UiField, {
  label: 'Workspace name',
  description: 'Used across internal tools.',
}, {
  default: ({ controlId, labelledBy, describedBy }) =>
    h(UiInput, {
      id: controlId,
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
      modelValue: name.value,
      'onUpdate:modelValue': (value: string) => {
        name.value = value
      },
    }),
})
```

### UiCard And UiPanel

```ts
h(UiCard, null, () => 'Compact grouped content')

h(UiPanel, { title: 'Settings' }, {
  default: () => h('p', null, 'Panel content'),
})
```

### UiTabs

```ts
h(UiTabs, {
  items: [
    { label: 'General', value: 'general' },
    { label: 'Activity', value: 'activity' },
  ],
  modelValue: activeTab.value,
  'onUpdate:modelValue': (value: string) => {
    activeTab.value = value
  },
})
```

### UiDialog

```ts
h(UiDialog, {
  open: dialogOpen.value,
  title: 'Delete draft',
  'onUpdate:open': (value: boolean) => {
    dialogOpen.value = value
  },
}, {
  default: () => h('p', null, 'This action cannot be undone.'),
  actions: ({ close }) => [
    h(UiButton, { variant: 'ghost', onClick: close }, () => 'Cancel'),
    h(UiButton, { onClick: close }, () => 'Delete'),
  ],
})
```

### UiDropdown

```ts
h(UiDropdown, {
  items: [
    { label: 'Open', value: 'open' },
    { label: 'Duplicate', value: 'duplicate' },
    { type: 'separator' },
    { label: 'Archive', value: 'archive' },
  ],
  onSelect: (item) => {
    console.log(item.value)
  },
}, {
  trigger: () => h(UiButton, { variant: 'secondary' }, () => 'Actions'),
})
```

### UiContextMenu

```ts
h(UiContextMenu, {
  items: [
    { label: 'Open', value: 'open' },
    { label: 'Rename', value: 'rename' },
    { type: 'separator' },
    { label: 'Delete', value: 'delete', disabled: true },
  ],
  onSelect: (item) => {
    console.log(item.value)
  },
}, {
  default: () => h('div', { style: 'padding: 16px;' }, 'Right-click here'),
})
```

### UiPopover

```ts
h(UiPopover, null, {
  trigger: () => h(UiButton, { variant: 'secondary' }, () => 'Open details'),
  default: ({ close }) => [
    h('h3', null, 'Project rules'),
    h('p', null, 'Keep names stable and reusable.'),
    h(UiButton, { size: 'sm', onClick: close }, () => 'Close'),
  ],
})
```

### UiTooltip

```ts
h(UiTooltip, { content: 'Refresh project metrics' }, {
  trigger: () => h(UiButton, { size: 'sm', variant: 'ghost' }, () => 'Refresh'),
})
```

### UiToast

```ts
h(UiToastViewport)

showToast({
  type: 'success',
  title: 'Saved',
  description: 'Changes were stored successfully.',
})
```

## Package Exports

Primary entry points:

- `@sejta/lui`
- `@sejta/lui/style.css`
- `@sejta/lui/components`
- `@sejta/lui/composables`
- `@sejta/lui/app`

Main public root:

- [`src/index.ts`](/home/laslo/lui/src/index.ts)

## Build And Development

Useful scripts:

- `npm run dev` - playground/dev server
- `npm run build` - library build into `dist`
- `npm run build:demo` - demo build
- `npm run typecheck` - TypeScript validation

Build output goes to:

- `dist/index.js`
- `dist/index.d.ts`
- `dist/style.css`

## Current Boundaries

Deliberately not included yet:

- `UiSelect`
- combobox/searchable select
- date/time pickers
- tables/datagrids
- form framework
- validation system
- notification framework

`UiSelect` stays out until there is a real product use-case.

## Project References

For deeper internal notes:

- [ARCHITECTURE.md](/home/laslo/lui/ARCHITECTURE.md)
- [COMPONENTS.md](/home/laslo/lui/COMPONENTS.md)
- [STYLES.md](/home/laslo/lui/STYLES.md)
- [ROADMAP.md](/home/laslo/lui/ROADMAP.md)
