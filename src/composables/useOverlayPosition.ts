export interface OverlayPositionOptions {
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
  offset?: number
  matchTriggerWidth?: boolean
}

export const useOverlayPositionSpec = {
  name: 'useOverlayPosition',
  status: 'planned',
  responsibility: 'provide base positioning contract for dropdowns, popovers, and tooltips',
} as const
