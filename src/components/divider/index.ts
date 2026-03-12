export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  inset?: boolean
}

export const dividerSpec = {
  name: 'LuiDivider',
  status: 'planned',
  category: 'structure',
} as const
