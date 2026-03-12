# Roadmap

## v0.1 Architecture Baseline

Target of this phase:

- repository shape
- source layering
- public export surface
- component and composable contracts
- CSS foundation structure
- written scope boundaries

Deliverables:

- docs completed
- `src` folder scaffolded
- placeholder contracts created
- no real component rendering yet

## After v0.1

### v0.2 Foundation Implementation

- implement CSS tokens and reset with real values
- implement core composables
- implement Button, Input, Textarea, Divider
- add first internal usage examples

### v0.3 Overlay Core

- implement Dialog, Popover, Tooltip
- stabilize overlay positioning and focus/escape patterns
- define layering and portal strategy if needed

### v0.4 Product Shell

- implement AppShell, Sidebar, Toolbar, Tabs
- document layout composition patterns

## Decision Gates

Do not add new infrastructure until one of these becomes real:

- repeated manual build pain
- component implementation duplication
- real theming complexity
- actual package boundary need

## Explicit v0.1 Exclusions

- monorepo
- plugin system
- docs site
- storybook requirement
- visual regression setup
- heavy widgets
