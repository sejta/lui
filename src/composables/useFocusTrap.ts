import { nextTick, onBeforeUnmount, onMounted, watch, type Ref } from 'vue'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
}

export interface UseFocusTrapOptions {
  enabled?: Ref<boolean> | boolean
  restoreFocus?: boolean
}

export function useFocusTrap(containerRef: Ref<HTMLElement | null>, options: UseFocusTrapOptions = {}) {
  let savedFocus: HTMLElement | null = null

  const resolveEnabled = (): boolean => {
    if (typeof options.enabled === 'object' && options.enabled !== null && 'value' in options.enabled) {
      return Boolean(options.enabled.value)
    }
    return options.enabled ?? true
  }

  const activate = async () => {
    await nextTick()
    const container = containerRef.value
    if (!container) return

    savedFocus = document.activeElement as HTMLElement | null

    const focusable = getFocusable(container)
    focusable[0]?.focus()
  }

  const deactivate = () => {
    if (options.restoreFocus !== false && savedFocus && document.body.contains(savedFocus)) {
      savedFocus.focus()
    }
    savedFocus = null
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || !resolveEnabled()) return

    const container = containerRef.value
    if (!container) return

    const focusable = getFocusable(container)
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement

    if (event.shiftKey) {
      if (active === first || !container.contains(active)) {
        event.preventDefault()
        last.focus()
      }
    } else {
      if (active === last || !container.contains(active)) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
    if (resolveEnabled()) {
      void activate()
    }
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
    deactivate()
  })

  if (typeof options.enabled === 'object' && options.enabled !== null && 'value' in options.enabled) {
    watch(options.enabled, (isEnabled) => {
      if (isEnabled) {
        void activate()
      } else {
        deactivate()
      }
    })
  }
}
