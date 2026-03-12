export interface InputProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
}

export const inputSpec = {
  name: 'LuiInput',
  status: 'planned',
  category: 'input',
} as const
