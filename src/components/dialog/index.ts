export interface DialogProps {
  open?: boolean
  modal?: boolean
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
}

export const dialogSpec = {
  name: 'LuiDialog',
  status: 'planned',
  category: 'overlay',
} as const
