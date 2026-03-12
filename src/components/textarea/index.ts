export interface TextareaProps {
  modelValue?: string
  placeholder?: string
  rows?: number
  disabled?: boolean
}

export const textareaSpec = {
  name: 'LuiTextarea',
  status: 'planned',
  category: 'input',
} as const
