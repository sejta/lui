import { h, type VNode, type VNodeRef } from 'vue'

export interface UiMenuItem {
  label?: string
  value?: string
  disabled?: boolean
  type?: 'item' | 'separator'
}

interface RenderMenuContentOptions<TItem extends UiMenuItem> {
  items: TItem[]
  menuClassName?: string
  menuRef?: VNodeRef
  placement: string
  style?: Record<string, string>
  onSelect: (item: TItem) => void
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
          disabled: item.disabled,
          onClick: () => {
            if (item.disabled) {
              return
            }

            onSelect(item)
          },
        },
        item.label,
      )
    }),
  )
}
