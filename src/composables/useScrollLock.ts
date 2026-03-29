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

  const lock = () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.setProperty('--lui-scrollbar-compensation', `${scrollbarWidth}px`)
    document.body.classList.add(className)
    document.body.dataset.luiScrollLock = 'true'
  }

  const unlock = () => {
    document.body.classList.remove(className)
    document.body.dataset.luiScrollLock = 'false'
    document.body.style.removeProperty('--lui-scrollbar-compensation')
  }

  watchEffect((onCleanup) => {
    if (typeof document === 'undefined') {
      return
    }

    if (!resolveEnabled()) {
      unlock()
      return
    }

    lock()
    onCleanup(unlock)
  })

  onBeforeUnmount(() => {
    if (typeof document === 'undefined') {
      return
    }

    unlock()
  })
}
