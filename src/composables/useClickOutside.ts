import { onBeforeUnmount, onMounted, type Ref } from 'vue'

export interface UseClickOutsideOptions {
  enabled?: Ref<boolean> | boolean
  ignore?: Array<Ref<HTMLElement | null> | HTMLElement | null>
  eventName?: 'pointerdown' | 'mousedown' | 'click'
}

export function useClickOutside(
  target: Ref<HTMLElement | null>,
  handler: (event: MouseEvent | PointerEvent) => void,
  options: UseClickOutsideOptions = {},
) {
  const resolveEnabled = () => {
    if (typeof options.enabled === 'object' && options.enabled !== null && 'value' in options.enabled) {
      return Boolean(options.enabled.value)
    }

    return options.enabled ?? true
  }

  const resolveIgnoredElements = () =>
    (options.ignore ?? []).map((entry) => {
      if (typeof entry === 'object' && entry !== null && 'value' in entry) {
        return entry.value
      }

      return entry
    })

  const onEvent = (event: Event) => {
    if (!resolveEnabled()) {
      return
    }

    const element = target.value
    const eventTarget = event.target as Node | null

    if (!element || !eventTarget) {
      return
    }

    if (element.contains(eventTarget)) {
      return
    }

    const ignored = resolveIgnoredElements()
    if (ignored.some((node) => node?.contains(eventTarget))) {
      return
    }

    handler(event as MouseEvent | PointerEvent)
  }

  const eventName = options.eventName ?? 'pointerdown'

  onMounted(() => {
    document.addEventListener(eventName, onEvent)
  })

  onBeforeUnmount(() => {
    document.removeEventListener(eventName, onEvent)
  })
}
