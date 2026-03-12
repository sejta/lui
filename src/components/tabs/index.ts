export interface TabsProps {
  modelValue?: string
  orientation?: 'horizontal' | 'vertical'
}

export const tabsSpec = {
  name: 'LuiTabs',
  status: 'planned',
  category: 'navigation',
} as const
