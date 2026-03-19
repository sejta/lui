import { readonly, ref } from 'vue'

export type UiToastType = 'success' | 'info' | 'warning' | 'error'

export interface ShowToastOptions {
  type?: UiToastType
  title: string
  description?: string
  dismissAfter?: number
  showCloseButton?: boolean
}

export interface UiToastRecord extends Required<Pick<ShowToastOptions, 'type' | 'title' | 'dismissAfter' | 'showCloseButton'>> {
  id: number
  description?: string
}

const DEFAULT_DISMISS_AFTER = 4000

const toasts = ref<UiToastRecord[]>([])
const toastTimers = new Map<number, number>()
let toastId = 0

export function dismissToast(id: number) {
  const timer = toastTimers.get(id)
  if (timer !== undefined) {
    window.clearTimeout(timer)
    toastTimers.delete(id)
  }

  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

export function showToast(options: ShowToastOptions) {
  const toast: UiToastRecord = {
    id: ++toastId,
    type: options.type ?? 'info',
    title: options.title,
    description: options.description,
    dismissAfter: options.dismissAfter ?? DEFAULT_DISMISS_AFTER,
    showCloseButton: options.showCloseButton ?? true,
  }

  toasts.value = [toast, ...toasts.value]

  const timer = window.setTimeout(() => {
    dismissToast(toast.id)
  }, toast.dismissAfter)

  toastTimers.set(toast.id, timer)

  return toast.id
}

export function clearToasts() {
  toastTimers.forEach((timer) => {
    window.clearTimeout(timer)
  })

  toastTimers.clear()
  toasts.value = []
}

export function useToast() {
  return {
    toasts: readonly(toasts),
    showToast,
    dismissToast,
    clearToasts,
  }
}
