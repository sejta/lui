import { computed, defineComponent, h, ref, Teleport, toRef, type PropType } from 'vue'

import { useClickOutside, useControllableState, useEscape, useOverlayPosition } from '../../composables'

export interface UiPopoverProps {
  open?: boolean
  disabled?: boolean
  placement?: 'top' | 'top-start' | 'top-end' | 'right' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left'
  offset?: number
}

export const UiPopover = defineComponent({
  name: 'UiPopover',
  props: {
    open: {
      type: Boolean,
      default: undefined,
    },
    disabled: Boolean,
    placement: {
      type: String as PropType<UiPopoverProps['placement']>,
      default: 'bottom',
    },
    offset: {
      type: Number,
      default: 8,
    },
  },
  emits: {
    'update:open': (value: boolean) => typeof value === 'boolean',
    close: () => true,
  },
  setup(props, { emit, slots, attrs }) {
    const anchorRef = ref<HTMLElement | null>(null)
    const floatingRef = ref<HTMLElement | null>(null)

    const state = useControllableState<boolean>({
      value: toRef(props, 'open'),
      defaultValue: false,
      disabled: toRef(props, 'disabled'),
      onChange: (value) => {
        emit('update:open', value)

        if (!value) {
          emit('close')
        }
      },
    })

    const isOpen = computed(() => Boolean(state.value.value))
    const className = computed(() => ['lui-popover', attrs.class].filter(Boolean).join(' '))

    const { floatingStyles, placement } = useOverlayPosition(anchorRef, floatingRef, {
      open: isOpen,
      placement: props.placement,
      offset: props.offset,
    })

    const closePopover = () => {
      if (!isOpen.value) {
        return
      }

      state.setValue(false)
    }

    const togglePopover = () => {
      state.setValue(!isOpen.value)
    }

    useEscape(() => {
      closePopover()
    }, {
      enabled: isOpen,
      stopPropagation: true,
    })

    useClickOutside(floatingRef, () => {
      closePopover()
    }, {
      enabled: isOpen,
      ignore: [anchorRef],
    })

    return () => {
      const trigger = h(
        'span',
        {
          ref: anchorRef,
          class: 'lui-popover__trigger',
          onClick: () => {
            if (props.disabled) {
              return
            }

            togglePopover()
          },
        },
        slots.trigger?.({
          open: isOpen.value,
          disabled: props.disabled,
        }),
      )

      const overlay = isOpen.value
        ? h(Teleport, { to: 'body' }, [
            h(
              'div',
              {
                ref: floatingRef,
                class: 'lui-popover__content lui-surface',
                style: floatingStyles.value,
                role: 'dialog',
                'aria-modal': 'false',
                'data-placement': placement.value,
              },
              slots.default?.({
                close: closePopover,
              }),
            ),
          ])
        : null

      return h('div', { ...attrs, class: className.value }, [trigger, overlay])
    }
  },
})
