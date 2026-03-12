export interface UseScrollLockOptions {
  enabled?: boolean
  lockClassName?: string
}

export const useScrollLockSpec = {
  name: 'useScrollLock',
  status: 'planned',
  responsibility: 'lock document scrolling for dialogs and overlays',
} as const
