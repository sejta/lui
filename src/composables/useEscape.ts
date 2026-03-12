export interface UseEscapeOptions {
  enabled?: boolean
  stopPropagation?: boolean
}

export const useEscapeSpec = {
  name: 'useEscape',
  status: 'planned',
  responsibility: 'handle Escape key behavior for dismissible UI',
} as const
