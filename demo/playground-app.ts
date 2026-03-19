import { defineComponent, h, ref } from 'vue'

import {
  UiButton,
  UiCard,
  UiCheckbox,
  UiContextMenu,
  UiDialog,
  UiDivider,
  UiDropdown,
  UiField,
  UiInput,
  UiPanel,
  UiPopover,
  UiRadioGroup,
  UiSwitch,
  UiTabs,
  UiTextarea,
  UiToastViewport,
  UiTooltip,
  showToast,
  useToast,
  type UiRadioItem,
  type UiContextMenuItem,
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
    const emailNotifications = ref(true)
    const weeklyDigest = ref(false)
    const desktopAlerts = ref(true)
    const compactMode = ref(false)
    const betaFeatures = ref(false)
    const appearanceMode = ref('system')
    const requireApproval = ref(false)
    const infoDialogOpen = ref(false)
    const confirmDialogOpen = ref(false)
    const formDialogOpen = ref(false)
    const projectName = ref('Lui internal toolkit')
    const projectDescription = ref('Shared primitives for internal tools and compact product UIs.')
    const popoverNote = ref('Popover content can hold lightweight explanatory UI and compact actions.')
    const activeSettingsTab = ref('general')
    const dropdownSelection = ref('No action selected yet.')
    const contextMenuSelection = ref('No context action selected yet.')
    const { clearToasts } = useToast()
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
    const contextMenuItems: UiContextMenuItem[] = [
      { label: 'Open details', value: 'open-details' },
      { label: 'Pin panel', value: 'pin-panel' },
      { type: 'separator' },
      { label: 'Move to archive', value: 'move-to-archive' },
      { label: 'Delete item', value: 'delete-item', disabled: true },
    ]
    const appearanceOptions: UiRadioItem[] = [
      { label: 'System', value: 'system', description: 'Follow the OS appearance automatically.' },
      { label: 'Light', value: 'light', description: 'Use a lighter canvas for dense daytime work.' },
      { label: 'Dark', value: 'dark', description: 'Use darker surfaces for low-light sessions.' },
      { label: 'High contrast', value: 'contrast', description: 'Reserved for later tuning.', disabled: true },
    ]

    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
      document.documentElement.dataset.luiTheme = theme.value
    }

    const triggerToast = (type: 'success' | 'info' | 'warning' | 'error') => {
      const presets = {
        success: {
          title: 'Changes saved',
          description: 'Project settings were updated successfully.',
        },
        info: {
          title: 'Sync started',
          description: 'Background sync is running for the current workspace.',
        },
        warning: {
          title: 'Review suggested',
          description: 'A few fields still use fallback defaults.',
        },
        error: {
          title: 'Publish failed',
          description: 'The release could not be queued for deployment.',
        },
      } as const

      showToast({
        type,
        ...presets[type],
      })
    }

    const triggerStackedToasts = () => {
      showToast({
        type: 'info',
        title: 'Import queued',
        description: 'The file is waiting for validation.',
      })
      showToast({
        type: 'success',
        title: 'Draft restored',
        description: 'Recovered the last unsaved version from local state.',
      })
      showToast({
        type: 'warning',
        title: 'Permissions changed',
        description: 'A few workspace actions may need to be re-authorized.',
      })
    }

    document.documentElement.dataset.luiTheme = theme.value

    return () =>
      h('div', { class: 'lui-root', 'data-lui-theme': theme.value }, [
        h(UiToastViewport),
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
              h(UiPanel, { title: 'Form Controls' }, {
                default: () => [
                  sectionIntro('Lightweight controls for settings screens and tool panels. Use Tab to move focus, Space to toggle checkbox and switch controls, and Arrow keys inside the radio group.'),
                  h('div', { class: 'playground-card-grid' }, [
                    h(UiCard, null, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Simple settings section'),
                        h(UiField, {
                          label: 'Project notifications',
                          description: 'Choose which activity should reach the team inbox.',
                        }, {
                          default: ({ controlId, describedBy, invalid, labelledBy, disabled }: Record<string, string | boolean | undefined>) =>
                            h('div', { class: 'lui-stack' }, [
                              h(UiCheckbox, {
                                id: `${controlId}-email`,
                                modelValue: emailNotifications.value,
                                disabled: Boolean(disabled),
                                'aria-labelledby': labelledBy,
                                'aria-describedby': describedBy,
                                'aria-invalid': invalid ? 'true' : undefined,
                                'onUpdate:modelValue': (value: boolean) => {
                                  emailNotifications.value = value
                                },
                              }, () => 'Email on deploy failures'),
                              h(UiCheckbox, {
                                id: `${controlId}-digest`,
                                modelValue: weeklyDigest.value,
                                'aria-describedby': describedBy,
                                'onUpdate:modelValue': (value: boolean) => {
                                  weeklyDigest.value = value
                                },
                              }, () => 'Weekly digest summary'),
                              h(UiCheckbox, {
                                id: `${controlId}-pager`,
                                modelValue: false,
                                disabled: true,
                              }, () => 'Pager escalation (disabled)'),
                            ]),
                        }),
                      ]),
                    ]),
                    h(UiCard, null, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Switch row'),
                        h(UiField, {
                          label: 'Workspace behavior',
                          description: 'Use switches for immediate on/off product settings.',
                        }, {
                          default: ({ controlId, describedBy }: Record<string, string | boolean | undefined>) =>
                            h('div', { class: 'playground-switch-list' }, [
                              h('div', { class: 'playground-switch-row' }, [
                                h('div', { class: 'lui-stack' }, [
                                  h('span', { class: 'lui-subtitle' }, 'Desktop alerts'),
                                  h('p', null, 'Show real-time delivery events in the toolbar.'),
                                ]),
                                h(UiSwitch, {
                                  id: `${controlId}-alerts`,
                                  modelValue: desktopAlerts.value,
                                  'aria-describedby': describedBy,
                                  'onUpdate:modelValue': (value: boolean) => {
                                    desktopAlerts.value = value
                                  },
                                }),
                              ]),
                              h('div', { class: 'playground-switch-row' }, [
                                h('div', { class: 'lui-stack' }, [
                                  h('span', { class: 'lui-subtitle' }, 'Compact mode'),
                                  h('p', null, 'Reduce spacing in dense operational views.'),
                                ]),
                                h(UiSwitch, {
                                  id: `${controlId}-compact`,
                                  modelValue: compactMode.value,
                                  'aria-describedby': describedBy,
                                  'onUpdate:modelValue': (value: boolean) => {
                                    compactMode.value = value
                                  },
                                }),
                              ]),
                              h('div', { class: 'playground-switch-row' }, [
                                h('div', { class: 'lui-stack' }, [
                                  h('span', { class: 'lui-subtitle' }, 'Beta features'),
                                  h('p', null, 'Temporarily unavailable for this workspace.'),
                                ]),
                                h(UiSwitch, {
                                  id: `${controlId}-beta`,
                                  modelValue: betaFeatures.value,
                                  disabled: true,
                                  'aria-describedby': describedBy,
                                }),
                              ]),
                            ]),
                        }),
                      ]),
                    ]),
                  ]),
                  h('div', { class: 'playground-card-grid' }, [
                    h(UiCard, null, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Radio selection'),
                        h(UiField, {
                          label: 'Appearance mode',
                          description: 'A compact radio group is enough for a small fixed set of options.',
                        }, {
                          default: ({ controlId, describedBy, labelledBy }: Record<string, string | boolean | undefined>) =>
                            h(UiRadioGroup, {
                              id: controlId,
                              modelValue: appearanceMode.value,
                              items: appearanceOptions,
                              'aria-describedby': describedBy,
                              'aria-labelledby': labelledBy,
                              'onUpdate:modelValue': (value: string) => {
                                appearanceMode.value = value
                              },
                            }),
                        }),
                      ]),
                    ]),
                    h(UiCard, null, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Field help and error'),
                        h(UiField, {
                          label: 'Release rules',
                          description: 'Field gives a common structure for label, help text, and validation copy.',
                          error: requireApproval.value ? '' : 'Confirm the release checklist before saving.',
                        }, {
                          default: ({ controlId, describedBy, invalid, labelledBy }: Record<string, string | boolean | undefined>) =>
                            h(UiCheckbox, {
                              id: controlId,
                              modelValue: requireApproval.value,
                              invalid: Boolean(invalid),
                              'aria-labelledby': labelledBy,
                              'aria-describedby': describedBy,
                              'onUpdate:modelValue': (value: boolean) => {
                                requireApproval.value = value
                              },
                            }, () => 'I reviewed the release checklist and approve the rollout'),
                        }),
                      ]),
                    ]),
                  ]),
                  h(UiCard, null, () => [
                    h('div', { class: 'lui-stack' }, [
                      h('h3', { class: 'lui-subtitle' }, 'Keyboard and state notes'),
                      h('div', { class: 'playground-state-list' }, [
                        h('div', { class: 'playground-state-item' }, 'Tab moves between controls in reading order.'),
                        h('div', { class: 'playground-state-item' }, 'Space toggles the focused checkbox or switch.'),
                        h('div', { class: 'playground-state-item' }, 'Arrow keys move selection inside the radio group.'),
                        h('div', { class: 'playground-state-item' }, 'Disabled and invalid states stay visible without changing layout rhythm.'),
                      ]),
                    ]),
                  ]),
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
              h(UiPanel, { title: 'Context Menu' }, {
                default: () => [
                  sectionIntro('ContextMenu reuses the same menu overlay foundation as Dropdown, but opens from cursor coordinates on contextmenu.'),
                  h('div', { class: 'playground-dropdown-grid' }, [
                    h(UiCard, null, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Panel context menu'),
                        h('p', null, 'Right-click inside the panel body to open the menu at the cursor position.'),
                        h(UiContextMenu, {
                          items: contextMenuItems,
                          onSelect: (item: UiContextMenuItem) => {
                            contextMenuSelection.value = `Panel context menu: ${item.label}`
                          },
                        }, {
                          default: () =>
                            h('div', { class: 'playground-context-target' }, [
                              h('strong', null, 'Project panel'),
                              h('p', null, 'Right-click anywhere in this surface.'),
                            ]),
                        }),
                      ]),
                    ]),
                    h(UiCard, { class: 'playground-card-edge' }, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Viewport edge'),
                        h('p', null, 'Open the menu near the lower-right area to verify flip and viewport shifting.'),
                        h(UiContextMenu, {
                          items: contextMenuItems,
                          onSelect: (item: UiContextMenuItem) => {
                            contextMenuSelection.value = `Edge context menu: ${item.label}`
                          },
                        }, {
                          default: () =>
                            h('div', { class: 'playground-context-target playground-context-target--edge' }, [
                              h('strong', null, 'Edge zone'),
                              h('p', null, 'Right-click near the far edge.'),
                            ]),
                        }),
                      ]),
                    ]),
                  ]),
                  h(UiCard, null, () => [
                    h('div', { class: 'lui-stack' }, [
                      h('h3', { class: 'lui-subtitle' }, 'Repeated right click reposition'),
                      h('p', null, 'Keep the menu open and right-click in another spot to move it without closing first.'),
                      h(UiContextMenu, {
                        items: contextMenuItems,
                        onSelect: (item: UiContextMenuItem) => {
                          contextMenuSelection.value = `Repositioned context menu: ${item.label}`
                        },
                      }, {
                        default: () =>
                          h('div', { class: 'playground-context-target playground-context-target--wide' }, [
                            h('strong', null, 'Reposition zone'),
                            h('p', null, 'Right-click multiple places in this area.'),
                          ]),
                      }),
                      h('p', null, contextMenuSelection.value),
                    ]),
                  ]),
                  h(UiCard, null, () => [
                    h('div', { class: 'lui-stack' }, [
                      h('h3', { class: 'lui-subtitle' }, 'Scrollable container'),
                      h('p', null, 'The context menu should escape overflow clipping and still open from the clicked point inside the scroller.'),
                      h('div', { class: 'playground-scroll-box' }, [
                        h('div', { class: 'playground-scroll-spacer' }, 'Scroll down inside this area'),
                        h(UiContextMenu, {
                          items: contextMenuItems,
                          onSelect: (item: UiContextMenuItem) => {
                            contextMenuSelection.value = `Scroll context menu: ${item.label}`
                          },
                        }, {
                          default: () =>
                            h('div', { class: 'playground-scroll-row playground-context-target' }, [
                              h('span', null, 'Scrollable row target'),
                              h('span', { class: 'lui-text-muted' }, 'Right-click here'),
                            ]),
                        }),
                        h('div', { class: 'playground-scroll-spacer' }),
                      ]),
                    ]),
                  ]),
                ],
              }),
              h(UiPanel, { title: 'Tooltip' }, {
                default: () => [
                  sectionIntro('Tooltip is a short, non-interactive hint built on the same positioning foundation, opened by hover or focus with a small delay.'),
                  h('div', { class: 'playground-dropdown-grid' }, [
                    h(UiCard, null, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Default button'),
                        h('p', null, 'Use it for compact button hints without introducing popover behavior.'),
                        h(UiTooltip, { content: 'Create a new draft from the current workspace.' }, {
                          trigger: () => h(UiButton, { variant: 'secondary' }, () => 'New draft'),
                        }),
                      ]),
                    ]),
                    h(UiCard, { class: 'playground-card-edge' }, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Viewport edge'),
                        h('p', null, 'Placed near the edge to verify flip and shift in a tooltip scenario.'),
                        h('div', { class: 'playground-align-end' }, [
                          h(UiTooltip, {
                            content: 'Inspect the last sync status without opening a larger panel.',
                            placement: 'top-end',
                          }, {
                            trigger: () => h(UiButton, { variant: 'ghost' }, () => 'Inspect'),
                          }),
                        ]),
                      ]),
                    ]),
                  ]),
                  h(UiCard, null, () => [
                    h('div', { class: 'lui-stack' }, [
                      h('h3', { class: 'lui-subtitle' }, 'Icon-like action'),
                      h('p', null, 'A tooltip matters most when the trigger is visually compact.'),
                      h('div', { class: 'lui-cluster' }, [
                        h(UiTooltip, { content: 'Refresh project metrics' }, {
                          trigger: () => h(UiButton, { size: 'sm', variant: 'ghost', class: 'playground-icon-button' }, () => 'R'),
                        }),
                        h(UiTooltip, { content: 'Duplicate current selection' }, {
                          trigger: () => h(UiButton, { size: 'sm', variant: 'ghost', class: 'playground-icon-button' }, () => 'D'),
                        }),
                        h(UiTooltip, { content: 'Archive this item' }, {
                          trigger: () => h(UiButton, { size: 'sm', variant: 'ghost', class: 'playground-icon-button' }, () => 'A'),
                        }),
                      ]),
                    ]),
                  ]),
                  h(UiCard, null, () => [
                    h('div', { class: 'lui-stack' }, [
                      h('h3', { class: 'lui-subtitle' }, 'Toolbar and compact controls'),
                      h('p', null, 'The same primitive should work in denser tool rows without becoming interactive.'),
                      h('div', { class: 'playground-toolbar-row' }, [
                        h(UiTooltip, { content: 'Refresh active records' }, {
                          trigger: () => h(UiButton, { size: 'sm', variant: 'secondary' }, () => 'Refresh'),
                        }),
                        h(UiDivider, { orientation: 'vertical' }),
                        h(UiTooltip, { content: 'Open filter rules' }, {
                          trigger: () => h(UiButton, { size: 'sm', variant: 'ghost' }, () => 'Filter'),
                        }),
                        h(UiTooltip, { content: 'Export the visible dataset' }, {
                          trigger: () => h(UiButton, { size: 'sm', variant: 'ghost' }, () => 'Export'),
                        }),
                      ]),
                    ]),
                  ]),
                ],
              }),
              h(UiPanel, { title: 'Toast' }, {
                default: () => [
                  sectionIntro('Toast is a small app feedback layer for save states, sync updates, warnings, and compact errors without introducing a larger notification framework.'),
                  h('div', { class: 'playground-card-grid' }, [
                    h(UiCard, null, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Toast types'),
                        h('p', null, 'Trigger one toast at a time for the common feedback cases.'),
                        h('div', { class: 'lui-cluster' }, [
                          h(UiButton, { size: 'sm', onClick: () => { triggerToast('success') } }, () => 'Success'),
                          h(UiButton, { size: 'sm', variant: 'secondary', onClick: () => { triggerToast('info') } }, () => 'Info'),
                          h(UiButton, { size: 'sm', variant: 'ghost', onClick: () => { triggerToast('warning') } }, () => 'Warning'),
                          h(UiButton, { size: 'sm', variant: 'secondary', onClick: () => { triggerToast('error') } }, () => 'Error'),
                        ]),
                      ]),
                    ]),
                    h(UiCard, null, () => [
                      h('div', { class: 'lui-stack' }, [
                        h('h3', { class: 'lui-subtitle' }, 'Stacking and manual close'),
                        h('p', null, 'Spawn several toasts together and close any one of them from the viewport.'),
                        h('div', { class: 'lui-cluster' }, [
                          h(UiButton, { size: 'sm', onClick: triggerStackedToasts }, () => 'Show stacked toasts'),
                          h(UiButton, { size: 'sm', variant: 'ghost', onClick: clearToasts }, () => 'Clear all'),
                        ]),
                      ]),
                    ]),
                  ]),
                  h(UiCard, null, () => [
                    h('div', { class: 'lui-stack' }, [
                      h('h3', { class: 'lui-subtitle' }, 'Auto dismiss'),
                      h('p', null, 'Each toast closes automatically after a short timeout unless manually dismissed first.'),
                      h(UiButton, {
                        size: 'sm',
                        variant: 'secondary',
                        onClick: () => {
                          showToast({
                            type: 'info',
                            title: 'Auto-dismiss preview',
                            description: 'This toast will disappear after a short delay.',
                            dismissAfter: 2200,
                          })
                        },
                      }, () => 'Show short-lived toast'),
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
