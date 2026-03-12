export interface TooltipProps {
  content?: string
  placement?: 'top' | 'right' | 'bottom' | 'left'
}

export const tooltipSpec = {
  name: 'LuiTooltip',
  status: 'planned',
  category: 'overlay',
} as const
