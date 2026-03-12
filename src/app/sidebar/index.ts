export interface SidebarProps {
  collapsed?: boolean
  side?: 'left' | 'right'
}

export const sidebarSpec = {
  name: 'LuiSidebar',
  status: 'planned',
  category: 'app',
} as const
