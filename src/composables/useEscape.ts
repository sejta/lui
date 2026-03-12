import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'

export interface UseEscapeOptions {
  enabled?: Ref<boolean> | boolean
  stopPropagation?: boolean
  target?: Document | HTMLElement | null
}

export function useEscape(handler: (event: KeyboardEvent) => void, options: UseEscapeOptions = {}) {
  const resolveEnabled = () => {
    if (typeof options.enabled === 'object' && options.enabled !== null && 'value' in options.enabled) {
      return Boolean(options.enabled.value)
    }

    return options.enabled ?? true
  }

  const resolveTarget = () => options.target ?? document

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !resolveEnabled()) {
      return
    }

    if (options.stopPropagation) {
      event.stopPropagation()
    }

    handler(event)
  }

  onMounted(() => {
    resolveTarget()?.addEventListener('keydown', onKeydown as EventListener)
  })

  onBeforeUnmount(() => {
    resolveTarget()?.removeEventListener('keydown', onKeydown as EventListener)
  })

  if (typeof options.enabled === 'object' && options.enabled !== null && 'value' in options.enabled) {
    watch(options.enabled, () => undefined)
  }
}
