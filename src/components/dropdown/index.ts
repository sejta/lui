import { computed, defineComponent, h, ref, Teleport, toRef, type PropType } from 'vue'

import { useClickOutside, useControllableState, useEscape, useOverlayPosition } from '../../composables'

export interface UiDropdownItem {
  label?: string
  value?: string
  disabled?: boolean
  type?: 'item' | 'separator'
}

export interface UiDropdownProps {
  items: UiDropdownItem[]
  open?: boolean
  disabled?: boolean
  placement?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
}

export const UiDropdown = defineComponent({
  name: 'UiDropdown',
  props: {
    items: {
      type: Array as PropType<UiDropdownItem[]>,
      required: true,
    },
    open: {
      type: Boolean,
      default: undefined,
    },
    disabled: Boolean,
    placement: {
      type: String as PropType<UiDropdownProps['placement']>,
      default: 'bottom-start',
    },
  },
  emits: {
    'update:open': (value: boolean) => typeof value === 'boolean',
    select: (item: UiDropdownItem) => Boolean(item),
  },
  setup(props, { emit, slots, attrs }) {
    const anchorRef = ref<HTMLElement | null>(null)
    const floatingRef = ref<HTMLElement | null>(null)

    const state = useControllableState<boolean>({
      value: toRef(props, 'open'),
      defaultValue: false,
      disabled: toRef(props, 'disabled'),
      onChange: (value) => emit('update:open', value),
    })

    const isOpen = computed(() => Boolean(state.value.value))
    const className = computed(() => ['lui-dropdown', attrs.class].filter(Boolean).join(' '))

    const { floatingStyles, placement } = useOverlayPosition(anchorRef, floatingRef, {
      open: isOpen,
      placement: props.placement,
      offset: 6,
      matchTriggerWidth: true,
    })

    const closeDropdown = () => {
      if (!isOpen.value) {
        return
      }

      state.setValue(false)
    }

    const toggleDropdown = () => {
      state.setValue(!isOpen.value)
    }

    useEscape(() => {
      closeDropdown()
    }, {
      enabled: isOpen,
      stopPropagation: true,
    })

    useClickOutside(floatingRef, () => {
      closeDropdown()
    }, {
      enabled: isOpen,
      ignore: [anchorRef],
    })

    return () => {
      const trigger = h(
        'span',
        {
          ref: anchorRef,
          class: 'lui-dropdown__trigger',
          onClick: () => {
            if (props.disabled) {
              return
            }

            toggleDropdown()
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
                class: 'lui-dropdown__menu lui-surface',
                style: floatingStyles.value,
                role: 'menu',
                'data-placement': placement.value,
              },
              props.items.map((item, index) => {
                if (item.type === 'separator') {
                  return h('div', {
                    key: `separator-${index}`,
                    class: 'lui-dropdown__separator',
                    role: 'separator',
                  })
                }

                return h(
                  'button',
                  {
                    key: item.value ?? item.label ?? index,
                    class: 'lui-dropdown__item',
                    type: 'button',
                    role: 'menuitem',
                    disabled: item.disabled,
                    onClick: () => {
                      if (item.disabled) {
                        return
                      }

                      emit('select', item)
                      closeDropdown()
                    },
                  },
                  item.label,
                )
              }),
            ),
          ])
        : null

      return h('div', { ...attrs, class: className.value }, [trigger, overlay])
    }
  },
})
