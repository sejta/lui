import { h, type Component, type VNode, type VNodeRef } from 'vue'

export interface UiMenuItem {
  label?: string
  value?: string
  disabled?: boolean
  type?: 'item' | 'separator'
  icon?: Component
}

interface RenderMenuContentOptions<TItem extends UiMenuItem> {
  items: TItem[]
  menuClassName?: string
  menuRef?: VNodeRef
  placement: string
  style?: Record<string, string>
  onSelect: (item: TItem) => void
}

function handleMenuKeydown(event: KeyboardEvent) {
  const menu = event.currentTarget as HTMLElement
  const items = Array.from(
    menu.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])'),
  )
  if (items.length === 0) return

  const current = document.activeElement as HTMLElement
  const currentIndex = items.indexOf(current)

  let nextIndex: number | null = null

  if (event.key === 'ArrowDown') {
    nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
  } else if (event.key === 'ArrowUp') {
    nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
  } else if (event.key === 'Home') {
    nextIndex = 0
  } else if (event.key === 'End') {
    nextIndex = items.length - 1
  } else {
    return
  }

  event.preventDefault()
  items[nextIndex]?.focus()
}

export function renderMenuContent<TItem extends UiMenuItem>({
  items,
  menuClassName = 'lui-dropdown__menu lui-surface',
  menuRef,
  placement,
  style,
  onSelect,
}: RenderMenuContentOptions<TItem>): VNode {
  return h(
    'div',
    {
      ref: menuRef,
      class: menuClassName,
      style,
      role: 'menu',
      'data-placement': placement,
      'data-lui-floating': 'true',
      onKeydown: handleMenuKeydown,
    },
    items.map((item, index) => {
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
          tabindex: -1,
          disabled: item.disabled,
          onClick: () => {
            if (item.disabled) {
              return
            }

            onSelect(item)
          },
        },
        [
          item.icon
            ? h(item.icon, { class: 'lui-dropdown__item-icon', 'aria-hidden': 'true' })
            : null,
          item.label,
        ],
      )
    }),
  )
}
