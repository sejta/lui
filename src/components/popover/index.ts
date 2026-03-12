export interface PopoverProps {
  open?: boolean
  placement?: 'top' | 'right' | 'bottom' | 'left'
}

export const popoverSpec = {
  name: 'LuiPopover',
  status: 'planned',
  category: 'overlay',
} as const
