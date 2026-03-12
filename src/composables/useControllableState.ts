export interface UseControllableStateOptions<T> {
  value?: T
  defaultValue?: T
  disabled?: boolean
}

export const useControllableStateSpec = {
  name: 'useControllableState',
  status: 'planned',
  responsibility: 'bridge controlled and uncontrolled component state',
} as const
