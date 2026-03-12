export interface ContextMenuProps {
  disabled?: boolean
  placement?: 'right' | 'bottom'
}

export const contextMenuSpec = {
  name: 'LuiContextMenu',
  status: 'planned',
  category: 'overlay',
} as const
