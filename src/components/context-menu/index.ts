import { computed, defineComponent, h, ref, Teleport, toRef, type PropType } from 'vue'
import { type Placement, type VirtualElement } from '@floating-ui/dom'

import { useClickOutside, useControllableState, useEscape, useOverlayPosition } from '../../composables'
import { renderMenuContent, type UiMenuItem } from '../menu/shared'

export interface UiContextMenuItem extends UiMenuItem {}

export interface UiContextMenuProps {
  items: UiContextMenuItem[]
  open?: boolean
  disabled?: boolean
  placement?: Placement
}

export const UiContextMenu = defineComponent({
  name: 'UiContextMenu',
  props: {
    items: {
      type: Array as PropType<UiContextMenuItem[]>,
      required: true,
    },
    open: {
      type: Boolean,
      default: undefined,
    },
    disabled: Boolean,
    placement: {
      type: String as PropType<UiContextMenuProps['placement']>,
      default: 'right-start',
    },
  },
  emits: {
    'update:open': (value: boolean) => typeof value === 'boolean',
    select: (item: UiContextMenuItem) => Boolean(item),
  },
  setup(props, { emit, slots, attrs }) {
    const anchorRef = ref<VirtualElement | null>(null)
    const floatingRef = ref<HTMLElement | null>(null)

    const state = useControllableState<boolean>({
      value: toRef(props, 'open'),
      defaultValue: false,
      disabled: toRef(props, 'disabled'),
      onChange: (value) => emit('update:open', value),
    })

    const isOpen = computed(() => Boolean(state.value.value))
    const className = computed(() => ['lui-context-menu', attrs.class].filter(Boolean).join(' '))

    const { floatingStyles, placement, updatePosition } = useOverlayPosition(anchorRef, floatingRef, {
      open: isOpen,
      placement: props.placement,
      offset: 4,
    })

    const closeMenu = () => {
      if (!isOpen.value) {
        return
      }

      state.setValue(false)
    }

    const openMenu = (event: MouseEvent) => {
      if (props.disabled) {
        return
      }

      event.preventDefault()

      const contextElement = event.currentTarget instanceof HTMLElement ? event.currentTarget : null
      const x = event.clientX
      const y = event.clientY

      anchorRef.value = {
        contextElement: contextElement ?? undefined,
        getBoundingClientRect: () =>
          DOMRect.fromRect({
            x,
            y,
            width: 0,
            height: 0,
          }),
      }

      if (!isOpen.value) {
        state.setValue(true)
        return
      }

      void updatePosition()
    }

    useEscape(() => {
      closeMenu()
    }, {
      enabled: isOpen,
      stopPropagation: true,
    })

    useClickOutside(floatingRef, () => {
      closeMenu()
    }, {
      enabled: isOpen,
    })

    return () => {
      const overlay = isOpen.value
        ? h(Teleport, { to: 'body' }, [
            renderMenuContent({
              items: props.items,
              menuClassName: 'lui-context-menu__menu lui-dropdown__menu lui-surface',
              menuRef: (value) => {
                floatingRef.value = value as HTMLElement | null
              },
              placement: placement.value,
              style: floatingStyles.value as Record<string, string>,
              onSelect: (item) => {
                emit('select', item)
                closeMenu()
              },
            }),
          ])
        : null

      return h(
        'div',
        {
          ...attrs,
          class: className.value,
          onContextmenu: openMenu,
        },
        [slots.default?.(), overlay],
      )
    }
  },
})
