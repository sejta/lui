import { defineComponent, h, ref } from 'vue'

import {
  UiButton,
  UiCard,
  UiDialog,
  UiDivider,
  UiDropdown,
  UiInput,
  UiPanel,
  UiPopover,
  UiTabs,
  UiTextarea,
  type UiDropdownItem,
  type UiTabsItem,
} from '../src'

const sectionIntro = (description: string) => h('p', { class: 'playground-section__intro' }, description)

const field = (label: string, control: ReturnType<typeof h>) =>
  h('label', { class: 'playground-field lui-stack' }, [
    h('span', { class: 'playground-label' }, label),
    control,
  ])

export const PlaygroundApp = defineComponent({
  name: 'PlaygroundApp',
  setup() {
    const theme = ref<'light' | 'dark'>('light')
    const name = ref('')
    const email = ref('')
    const notes = ref('Short notes help expose spacing and control rhythm.')
    const infoDialogOpen = ref(false)
    const confirmDialogOpen = ref(false)
    const formDialogOpen = ref(false)
    const projectName = ref('Lui internal toolkit')
    const projectDescription = ref('Shared primitives for internal tools and compact product UIs.')
    const popoverNote = ref('Popover content can hold lightweight explanatory UI and compact actions.')
    const activeSettingsTab = ref('general')
    const dropdownSelection = ref('No action selected yet.')
    const settingsTabs: UiTabsItem[] = [
      { label: 'General', value: 'general' },
      { label: 'Appearance', value: 'appearance' },
      { label: 'Activity', value: 'activity' },
    ]
    const dropdownItems: UiDropdownItem[] = [
      { label: 'Open project', value: 'open' },
      { label: 'Duplicate', value: 'duplicate' },
      { type: 'separator' },
      { label: 'Archive', value: 'archive' },
      { label: 'Delete', value: 'delete', disabled: true },
    ]

    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
      document.documentElement.dataset.luiTheme = theme.value
    }

    document.documentElement.dataset.luiTheme = theme.value

    return () =>
      h('div', { class: 'lui-root', 'data-lui-theme': theme.value }, [
        h('div', { class: 'playground-shell' }, [
          h('aside', { class: 'playground-sidebar lui-surface' }, [
            h('div', { class: 'playground-sidebar__inner lui-stack' }, [
              h('div', { class: 'lui-stack' }, [
                h('div', { class: 'playground-eyebrow' }, 'lui'),
                h('h1', { class: 'playground-title' }, 'Foundation playground'),
                h(
                  'p',
                  { class: 'lui-text-muted' },
                  'A small demo surface for checking styles, spacing, and primitive behavior.',
                ),
              ]),
              h('div', { class: 'lui-stack' }, [
                h(UiButton, { onClick: toggleTheme, variant: 'secondary' }, () =>
                  theme.value === 'light' ? 'Switch to dark' : 'Switch to light',
                ),
                h('div', { class: 'playground-meta lui-stack' }, [
                  h('span', null, 'v0.3 playground'),
                  h('span', null, 'Vue 3 + CSS'),
                ]),
              ]),
            ]),
          ]),
          h('main', { class: 'playground-main' }, [
            h('div', { class: 'lui-content-boundary playground-content' }, [
              h(UiPanel, { title: 'Buttons' }, {
                default: () => [
                  sectionIntro('A minimal action set with only the variants needed right now.'),
                  h('div', { class: 'lui-cluster' }, [
                    h(UiButton, null, () => 'Primary'),
                    h(UiButton, { variant: 'secondary' }, () => 'Secondary'),
                    h(UiButton, { variant: 'ghost' }, () => 'Ghost'),
                    h(UiButton, { size: 'sm' }, () => 'Small'),
                    h(UiButton, { size: 'lg' }, () => 'Large'),
                    h(UiButton, { disabled: true }, () => 'Disabled'),
                  ]),
                ],
              }),
              h(UiPanel, { title: 'Inputs' }, {
                default: () => [
                  sectionIntro('Controls should feel quiet, neutral, and easy to scan in forms.'),
                  h('div', { class: 'playground-grid' }, [
                    field(
                      'Name',
                      h(UiInput, {
                        modelValue: name.value,
                        placeholder: 'Alex Mercer',
                        'onUpdate:modelValue': (value: string) => {
                          name.value = value
                        },
                      }),
                    ),
                    field(
                      'Email',
                      h(UiInput, {
                        modelValue: email.value,
                        type: 'email',
                        placeholder: 'alex@example.com',
                        'onUpdate:modelValue': (value: string) => {
                          email.value = value
                        },
                      }),
                    ),
                  ]),
                ],
              }),
              h(UiPanel, { title: 'Textareas' }, {
                default: () => [
                  sectionIntro('The multiline control uses the same foundation as input.'),
                  field(
                    'Notes',
                    h(UiTextarea, {
                      modelValue: notes.value,
                      rows: 5,
                      placeholder: 'Write something useful',
                      'onUpdate:modelValue': (value: string) => {
                        notes.value = value
                      },
                    }),
                  ),
                ],
              }),
              h(UiPanel, { title: 'Cards' }, {
                default: () => [
                  sectionIntro('Cards are simple surfaces with light separation and optional hover response.'),
                  h('div', { class: 'playground-card-grid' }, [
                    h(UiCard, null, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Default card'),
                        h('p', null, 'Use for compact content groups or secondary modules.'),
                      ]),
                    ]),
                    h(UiCard, { interactive: true }, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Interactive card'),
                        h('p', null, 'Hover state helps expose whether this treatment is enough.'),
                      ]),
                    ]),
                  ]),
                ],
              }),
              h(UiPanel, { title: 'Panels' }, {
                default: () => [
                  sectionIntro('Panels act as section containers for denser screens and app views.'),
                  h('div', { class: 'playground-card-grid' }, [
                    h(UiPanel, { title: 'Profile summary' }, {
                      default: () =>
                        h('p', null, 'Useful for stacked settings pages and admin screens.'),
                    }),
                    h(UiPanel, null, {
                      header: () => 'Custom header slot',
                      actions: () => h(UiButton, { size: 'sm', variant: 'ghost' }, () => 'Action'),
                      default: () =>
                        h('p', null, 'Keeps structure simple without fragmenting into subcomponents.'),
                    }),
                  ]),
                ],
              }),
              h(UiPanel, { title: 'Divider' }, {
                default: () => [
                  sectionIntro('Divider helps separate rows, sections, and compact tool areas without adding visual noise.'),
                  h(UiCard, null, () => [
                    h('div', { class: 'playground-toolbar-row' }, [
                      h(UiButton, { size: 'sm', variant: 'secondary' }, () => 'Refresh'),
                      h(UiDivider, { orientation: 'vertical' }),
                      h(UiButton, { size: 'sm', variant: 'ghost' }, () => 'Filter'),
                      h(UiButton, { size: 'sm', variant: 'ghost' }, () => 'Export'),
                    ]),
                    h(UiDivider, null),
                    h('p', null, 'Use the horizontal divider between panel areas and the vertical one inside compact action rows.'),
                  ]),
                ],
              }),
              h(UiPanel, { title: 'Tabs' }, {
                default: () => [
                  sectionIntro('Tabs support simple page sections and settings screens without introducing a compound API.'),
                  h(UiTabs, {
                    items: settingsTabs,
                    modelValue: activeSettingsTab.value,
                    'onUpdate:modelValue': (value: string) => {
                      activeSettingsTab.value = value
                    },
                  }, {
                    default: ({ item }: { item: UiTabsItem | null }) => {
                      if (item?.value === 'appearance') {
                        return h(UiCard, null, () => [
                          h('div', { class: 'lui-stack' }, [
                            h('h3', { class: 'lui-subtitle' }, 'Appearance'),
                            h('p', null, 'A realistic settings tab built from the same primitives already in the library.'),
                            h('div', { class: 'playground-setting-grid' }, [
                              h(UiCard, null, () => [
                                h('div', { class: 'lui-stack' }, [
                                  h('h3', { class: 'lui-subtitle' }, 'Theme'),
                                  h('div', { class: 'lui-cluster' }, [
                                    h(UiButton, { size: 'sm' }, () => 'Muted light'),
                                    h(UiButton, { size: 'sm', variant: 'secondary' }, () => 'Muted dark'),
                                  ]),
                                ]),
                              ]),
                              h(UiCard, null, () => [
                                h('div', { class: 'lui-stack' }, [
                                  h('h3', { class: 'lui-subtitle' }, 'Density'),
                                  h('p', null, 'Current foundation still prefers comfortable spacing for dashboard UI.'),
                                ]),
                              ]),
                            ]),
                          ]),
                        ])
                      }

                      if (item?.value === 'activity') {
                        return h(UiCard, null, () => [
                          h('div', { class: 'lui-stack' }, [
                            h('h3', { class: 'lui-subtitle' }, 'Recent activity'),
                            h('div', { class: 'playground-activity-list' }, [
                              h('div', { class: 'playground-activity-item' }, [
                                h('strong', null, 'Sync completed'),
                                h('p', null, 'Settings synced across internal tools 3 minutes ago.'),
                              ]),
                              h(UiDivider, null),
                              h('div', { class: 'playground-activity-item' }, [
                                h('strong', null, 'Profile updated'),
                                h('p', null, 'Input and panel primitives are enough for simple account screens.'),
                              ]),
                            ]),
                          ]),
                        ])
                      }

                      return h(UiCard, null, () => [
                        h('div', { class: 'lui-stack' }, [
                          h('div', { class: 'playground-section-head' }, [
                            h('div', { class: 'lui-stack' }, [
                              h('h3', { class: 'lui-subtitle' }, 'General settings'),
                              h('p', null, 'A settings section composed from buttons, inputs, textarea, divider, and tabs.'),
                            ]),
                            h(UiButton, { size: 'sm' }, () => 'Save'),
                          ]),
                          h(UiDivider, null),
                          h('div', { class: 'playground-grid' }, [
                            field(
                              'Workspace name',
                              h(UiInput, {
                                modelValue: name.value,
                                placeholder: 'Lui internal tools',
                                'onUpdate:modelValue': (value: string) => {
                                  name.value = value
                                },
                              }),
                            ),
                            field(
                              'Notification email',
                              h(UiInput, {
                                modelValue: email.value,
                                type: 'email',
                                placeholder: 'team@example.com',
                                'onUpdate:modelValue': (value: string) => {
                                  email.value = value
                                },
                              }),
                            ),
                          ]),
                          field(
                            'Notes',
                            h(UiTextarea, {
                              modelValue: notes.value,
                              rows: 4,
                              'onUpdate:modelValue': (value: string) => {
                                notes.value = value
                              },
                            }),
                          ),
                        ]),
                      ])
                    },
                  }),
                ],
              }),
              h(UiPanel, { title: 'Dialog' }, {
                default: () => [
                  sectionIntro('Dialog is the first overlay primitive: usable for information, confirmations, and compact forms.'),
                  h('div', { class: 'lui-cluster' }, [
                    h(UiButton, { onClick: () => { infoDialogOpen.value = true } }, () => 'Open info dialog'),
                    h(UiButton, { variant: 'secondary', onClick: () => { confirmDialogOpen.value = true } }, () => 'Open confirm dialog'),
                    h(UiButton, { variant: 'ghost', onClick: () => { formDialogOpen.value = true } }, () => 'Open form dialog'),
                  ]),
                  h(UiDialog, {
                    open: infoDialogOpen.value,
                    title: 'Foundation status',
                    showCloseButton: true,
                    'onUpdate:open': (value: boolean) => {
                      infoDialogOpen.value = value
                    },
                  }, {
                    default: () => [
                      h('p', null, 'The overlay foundation now supports backdrop, Escape handling, outside click closing, and scroll lock.'),
                      h('p', null, 'This is enough to move to dropdown and popover later without introducing a different interaction model.'),
                    ],
                    actions: ({ close }: { close: () => void }) => [
                      h(UiButton, { onClick: close }, () => 'Got it'),
                    ],
                  }),
                  h(UiDialog, {
                    open: confirmDialogOpen.value,
                    title: 'Delete draft settings?',
                    'onUpdate:open': (value: boolean) => {
                      confirmDialogOpen.value = value
                    },
                  }, {
                    default: () => [
                      h('p', null, 'This action removes the unsaved settings draft for the current workspace.'),
                      h('p', null, 'The dialog stays intentionally simple: one message block and a compact action row.'),
                    ],
                    actions: ({ close }: { close: () => void }) => [
                      h(UiButton, { variant: 'ghost', onClick: close }, () => 'Cancel'),
                      h(UiButton, { variant: 'secondary', onClick: close }, () => 'Delete draft'),
                    ],
                  }),
                  h(UiDialog, {
                    open: formDialogOpen.value,
                    title: 'Edit project details',
                    showCloseButton: true,
                    'onUpdate:open': (value: boolean) => {
                      formDialogOpen.value = value
                    },
                  }, {
                    default: () => [
                      field(
                        'Project name',
                        h(UiInput, {
                          modelValue: projectName.value,
                          'onUpdate:modelValue': (value: string) => {
                            projectName.value = value
                          },
                        }),
                      ),
                      field(
                        'Description',
                        h(UiTextarea, {
                          modelValue: projectDescription.value,
                          rows: 4,
                          'onUpdate:modelValue': (value: string) => {
                            projectDescription.value = value
                          },
                        }),
                      ),
                    ],
                    actions: ({ close }: { close: () => void }) => [
                      h(UiButton, { variant: 'ghost', onClick: close }, () => 'Cancel'),
                      h(UiButton, { onClick: close }, () => 'Save changes'),
                    ],
                  }),
                ],
              }),
              h(UiPanel, { title: 'Dropdown' }, {
                default: () => [
                  sectionIntro('Dropdown now uses real overlay positioning with flip, shift, auto-update, and teleport behavior.'),
                  h('div', { class: 'playground-dropdown-grid' }, [
                    h(UiCard, null, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Default dropdown'),
                        h('p', null, 'The basic menu case for tools and panel actions.'),
                        h(UiDropdown, {
                          items: dropdownItems,
                          onSelect: (item: UiDropdownItem) => {
                            dropdownSelection.value = `Default dropdown: ${item.label}`
                          },
                        }, {
                          trigger: () => h(UiButton, { variant: 'secondary' }, () => 'Project actions'),
                        }),
                      ]),
                    ]),
                    h(UiCard, { class: 'playground-card-edge' }, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Right edge'),
                        h('p', null, 'Placed near a card edge to verify flip and viewport shifting.'),
                        h('div', { class: 'playground-align-end' }, [
                          h(UiDropdown, {
                            items: dropdownItems,
                            placement: 'bottom-end',
                            onSelect: (item: UiDropdownItem) => {
                              dropdownSelection.value = `Edge dropdown: ${item.label}`
                            },
                          }, {
                            trigger: () => h(UiButton, { variant: 'ghost' }, () => 'More'),
                          }),
                        ]),
                      ]),
                    ]),
                  ]),
                  h(UiCard, null, () => [
                    h('div', { class: 'lui-stack' }, [
                      h('div', { class: 'playground-section-head' }, [
                        h('div', { class: 'lui-stack' }, [
                          h('h3', { class: 'lui-subtitle' }, 'Inside panel content'),
                          h('p', null, 'The overlay should escape the card flow and still position to the trigger.'),
                        ]),
                        h(UiDropdown, {
                          items: dropdownItems,
                          onSelect: (item: UiDropdownItem) => {
                            dropdownSelection.value = `Panel dropdown: ${item.label}`
                          },
                        }, {
                          trigger: () => h(UiButton, { size: 'sm', variant: 'secondary' }, () => 'Panel menu'),
                        }),
                      ]),
                      h(UiDivider, null),
                      h('p', null, dropdownSelection.value),
                    ]),
                  ]),
                  h(UiCard, null, () => [
                    h('div', { class: 'lui-stack' }, [
                      h('h3', { class: 'lui-subtitle' }, 'Scrollable container'),
                      h('p', null, 'This checks that the dropdown is not clipped by overflow and keeps updating on scroll.'),
                      h('div', { class: 'playground-scroll-box' }, [
                        h('div', { class: 'playground-scroll-spacer' }, 'Scroll down inside this area'),
                        h('div', { class: 'playground-scroll-row' }, [
                          h('span', null, 'Deep row action'),
                          h(UiDropdown, {
                            items: dropdownItems,
                            placement: 'bottom-end',
                            onSelect: (item: UiDropdownItem) => {
                              dropdownSelection.value = `Scroll dropdown: ${item.label}`
                            },
                          }, {
                            trigger: () => h(UiButton, { size: 'sm', variant: 'secondary' }, () => 'Actions'),
                          }),
                        ]),
                        h('div', { class: 'playground-scroll-spacer' }),
                      ]),
                    ]),
                  ]),
                ],
              }),
              h(UiPanel, { title: 'Popover' }, {
                default: () => [
                  sectionIntro('Popover reuses the same overlay positioning foundation, but without menu semantics or dropdown item API.'),
                  h('div', { class: 'playground-dropdown-grid' }, [
                    h(UiCard, null, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Default popover'),
                        h('p', null, 'Useful for contextual help or compact side content.'),
                        h(UiPopover, null, {
                          trigger: () => h(UiButton, { variant: 'secondary' }, () => 'Open details'),
                          default: ({ close }: { close: () => void }) => [
                            h('h3', { class: 'lui-subtitle' }, 'Foundation note'),
                            h('p', null, popoverNote.value),
                            h(UiButton, { size: 'sm', onClick: close }, () => 'Close'),
                          ],
                        }),
                      ]),
                    ]),
                    h(UiCard, { class: 'playground-card-edge' }, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Viewport edge'),
                        h('p', null, 'Placed near the card edge to verify flip and shift without menu-specific behavior.'),
                        h('div', { class: 'playground-align-end' }, [
                          h(UiPopover, { placement: 'bottom-end' }, {
                            trigger: () => h(UiButton, { variant: 'ghost' }, () => 'Inspect'),
                            default: () => [
                              h('h3', { class: 'lui-subtitle' }, 'Edge popover'),
                              h('p', null, 'The content stays attached to the trigger and shifts back into the viewport.'),
                            ],
                          }),
                        ]),
                      ]),
                    ]),
                  ]),
                  h(UiCard, null, () => [
                    h('div', { class: 'playground-section-head' }, [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Inside a panel'),
                        h('p', null, 'This checks that the popover remains an overlay instead of becoming part of the card layout.'),
                      ]),
                      h(UiPopover, { placement: 'bottom-end' }, {
                        trigger: () => h(UiButton, { size: 'sm', variant: 'secondary' }, () => 'Field help'),
                        default: () => [
                          h('h3', { class: 'lui-subtitle' }, 'Project rules'),
                          h('p', null, 'Keep names short, stable, and reusable across internal tools.'),
                        ],
                      }),
                    ]),
                  ]),
                  h(UiCard, null, () => [
                    h('div', { class: 'lui-stack' }, [
                      h('h3', { class: 'lui-subtitle' }, 'Scrollable container'),
                      h('p', null, 'The popover should stay visible above the scroll box and keep updating while scrolling.'),
                      h('div', { class: 'playground-scroll-box' }, [
                        h('div', { class: 'playground-scroll-spacer' }, 'Scroll down inside this area'),
                        h('div', { class: 'playground-scroll-row' }, [
                          h('span', null, 'Inline explanation'),
                          h(UiPopover, { placement: 'right' }, {
                            trigger: () => h(UiButton, { size: 'sm', variant: 'secondary' }, () => 'Why?'),
                            default: () => [
                              h('h3', { class: 'lui-subtitle' }, 'Scrollable popover'),
                              h('p', null, 'Because positioning is shared, the same overlay logic works here without extra scroll code.'),
                            ],
                          }),
                        ]),
                        h('div', { class: 'playground-scroll-spacer' }),
                      ]),
                    ]),
                  ]),
                ],
              }),
            ]),
          ]),
        ]),
      ])
  },
})
