export interface UseClickOutsideOptions {
  enabled?: boolean
  ignore?: Array<EventTarget | null>
}

export const useClickOutsideSpec = {
  name: 'useClickOutside',
  status: 'planned',
  responsibility: 'detect pointer interaction outside a target element',
} as const
