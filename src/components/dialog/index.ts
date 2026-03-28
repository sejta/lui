import { computed, defineComponent, h, ref, Teleport, toRef, useId } from 'vue'

import { useClickOutside, useControllableState, useEscape, useFocusTrap, useScrollLock } from '../../composables'

export interface UiDialogProps {
  open?: boolean
  title?: string
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
  showCloseButton?: boolean
}

export const UiDialog = defineComponent({
  name: 'UiDialog',
  props: {
    open: {
      type: Boolean,
      default: undefined,
    },
    title: String,
    closeOnEscape: {
      type: Boolean,
      default: true,
    },
    closeOnOutsideClick: {
      type: Boolean,
      default: true,
    },
    showCloseButton: Boolean,
  },
  emits: {
    'update:open': (value: boolean) => typeof value === 'boolean',
    close: () => true,
  },
  setup(props, { slots, emit }) {
    const panelRef = ref<HTMLElement | null>(null)
    const titleId = useId()

    const state = useControllableState<boolean>({
      value: toRef(props, 'open'),
      defaultValue: false,
      onChange: (value) => {
        emit('update:open', value)

        if (!value) {
          emit('close')
        }
      },
    })

    const isOpen = computed(() => Boolean(state.value.value))

    const closeDialog = () => {
      if (!isOpen.value) {
        return
      }

      state.setValue(false)
    }

    useScrollLock({
      enabled: isOpen,
    })

    useEscape(() => {
      if (!props.closeOnEscape) {
        return
      }

      closeDialog()
    }, {
      enabled: isOpen,
      stopPropagation: true,
    })

    useClickOutside(panelRef, () => {
      if (!props.closeOnOutsideClick) {
        return
      }

      closeDialog()
    }, {
      enabled: isOpen,
    })

    useFocusTrap(panelRef, {
      enabled: isOpen,
    })

    return () => {
      if (!isOpen.value) {
        return null
      }

      const dialogNode = h('div', { class: 'lui-dialog', role: 'presentation' }, [
        h('div', { class: 'lui-dialog__backdrop', 'aria-hidden': 'true' }),
        h(
          'div',
          {
            class: 'lui-dialog__viewport',
          },
          [
            h(
              'section',
              {
                ref: panelRef,
                class: 'lui-dialog__panel lui-surface',
                role: 'dialog',
                'aria-modal': 'true',
                'aria-labelledby': props.title ? titleId : undefined,
              },
              [
                props.title || props.showCloseButton
                  ? h('div', { class: 'lui-dialog__header' }, [
                      props.title ? h('h2', { id: titleId, class: 'lui-title' }, props.title) : h('div'),
                      props.showCloseButton
                        ? h(
                            'button',
                            {
                              class: 'lui-button',
                              'data-variant': 'ghost',
                              'data-size': 'sm',
                              type: 'button',
                              onClick: closeDialog,
                            },
                            'Close',
                          )
                        : null,
                    ])
                  : null,
                h('div', { class: 'lui-dialog__content' }, slots.default?.()),
                slots.actions
                  ? h('div', { class: 'lui-dialog__actions' }, slots.actions({ close: closeDialog }))
                  : null,
              ],
            ),
          ],
        ),
      ])

      return h(Teleport, { to: 'body' }, dialogNode)
    }
  },
})
