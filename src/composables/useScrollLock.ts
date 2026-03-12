import { onBeforeUnmount, watchEffect, type Ref } from 'vue'

export interface UseScrollLockOptions {
  enabled?: Ref<boolean> | boolean
  lockClassName?: string
}

export function useScrollLock(options: UseScrollLockOptions = {}) {
  const className = options.lockClassName ?? 'lui-scroll-lock'

  const resolveEnabled = () => {
    if (typeof options.enabled === 'object' && options.enabled !== null && 'value' in options.enabled) {
      return Boolean(options.enabled.value)
    }

    return options.enabled ?? true
  }

  watchEffect((onCleanup) => {
    if (typeof document === 'undefined') {
      return
    }

    if (!resolveEnabled()) {
      document.body.classList.remove(className)
      document.body.dataset.luiScrollLock = 'false'
      return
    }

    document.body.classList.add(className)
    document.body.dataset.luiScrollLock = 'true'

    onCleanup(() => {
      document.body.classList.remove(className)
      document.body.dataset.luiScrollLock = 'false'
    })
  })

  onBeforeUnmount(() => {
    if (typeof document === 'undefined') {
      return
    }

    document.body.classList.remove(className)
    document.body.dataset.luiScrollLock = 'false'
  })
}
