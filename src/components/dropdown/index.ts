import { computed, defineComponent, h, nextTick, ref, Teleport, toRef, watch, type PropType } from 'vue'

import { useClickOutside, useControllableState, useEscape, useOverlayPosition } from '../../composables'
import { renderMenuContent, type UiMenuItem } from '../menu/shared'

export interface UiDropdownItem extends UiMenuItem {}

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

    watch(floatingRef, async (menu) => {
      if (!menu || !isOpen.value) return
      await nextTick()
      const firstItem = menu.querySelector<HTMLElement>('[role="menuitem"]:not([disabled])')
      firstItem?.focus()
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
            renderMenuContent({
              items: props.items,
              menuRef: (value) => {
                floatingRef.value = value as HTMLElement | null
              },
              placement: placement.value,
              style: floatingStyles.value as Record<string, string>,
              onSelect: (item) => {
                emit('select', item)
                closeDropdown()
              },
            }),
          ])
        : null

      return h('div', { ...attrs, class: className.value }, [trigger, overlay])
    }
  },
})
