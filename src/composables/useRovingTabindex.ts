import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'

export interface UseRovingTabindexOptions {
  orientation?: Ref<'horizontal' | 'vertical'> | 'horizontal' | 'vertical'
  loop?: boolean
  itemSelector?: string
  onFocusItem?: (el: HTMLElement) => void
}

export function useRovingTabindex(
  containerRef: Ref<HTMLElement | null>,
  options: UseRovingTabindexOptions = {},
) {
  const resolveOrientation = (): 'horizontal' | 'vertical' => {
    const o = options.orientation
    if (o && typeof o === 'object' && 'value' in o) return o.value
    return (o as 'horizontal' | 'vertical') ?? 'horizontal'
  }

  const getItems = (): HTMLElement[] => {
    const container = containerRef.value
    if (!container) return []
    return Array.from(
      container.querySelectorAll<HTMLElement>(options.itemSelector ?? '[role="tab"]:not([disabled])'),
    )
  }

  const handleKeydown = (event: KeyboardEvent) => {
    const items = getItems()
    if (items.length === 0) return

    const current = event.target as HTMLElement
    const currentIndex = items.indexOf(current)
    if (currentIndex === -1) return

    const orientation = resolveOrientation()
    const loop = options.loop ?? true

    const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'
    const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'

    let nextIndex: number | null = null

    if (event.key === nextKey) {
      nextIndex = loop
        ? (currentIndex + 1) % items.length
        : Math.min(currentIndex + 1, items.length - 1)
    } else if (event.key === prevKey) {
      nextIndex = loop
        ? (currentIndex - 1 + items.length) % items.length
        : Math.max(currentIndex - 1, 0)
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = items.length - 1
    } else {
      return
    }

    event.preventDefault()

    const nextEl = items[nextIndex]
    if (!nextEl) return

    nextEl.focus()
    options.onFocusItem?.(nextEl)
  }

  onMounted(() => {
    containerRef.value?.addEventListener('keydown', handleKeydown)
  })

  onBeforeUnmount(() => {
    containerRef.value?.removeEventListener('keydown', handleKeydown)
  })

  watch(containerRef, (container, old) => {
    old?.removeEventListener('keydown', handleKeydown)
    container?.addEventListener('keydown', handleKeydown)
  })
}
