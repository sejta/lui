export interface DropdownProps {
  open?: boolean
  disabled?: boolean
  placement?: 'top' | 'bottom'
}

export const dropdownSpec = {
  name: 'LuiDropdown',
  status: 'planned',
  category: 'overlay',
} as const
