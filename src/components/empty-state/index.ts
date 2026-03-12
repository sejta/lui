export interface EmptyStateProps {
  title?: string
  description?: string
}

export const emptyStateSpec = {
  name: 'LuiEmptyState',
  status: 'planned',
  category: 'feedback',
} as const
