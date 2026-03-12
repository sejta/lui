export interface ButtonProps {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export const buttonSpec = {
  name: 'LuiButton',
  status: 'planned',
  category: 'action',
} as const
