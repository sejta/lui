import {
  autoUpdate,
  computePosition,
  flip,
  offset as floatingOffset,
  shift,
  size,
  type Placement,
} from '@floating-ui/dom'
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  watchEffect,
  type CSSProperties,
  type Ref,
} from 'vue'

export interface OverlayPositionOptions {
  placement?:
    | Placement
  offset?: number
  matchTriggerWidth?: boolean
  open?: Ref<boolean> | boolean
}

export function useOverlayPosition(
  anchorRef: Ref<HTMLElement | null>,
  floatingRef: Ref<HTMLElement | null>,
  options: OverlayPositionOptions = {},
) {
  const x = ref(0)
  const y = ref(0)
  const strategy = ref<'fixed'>('fixed')
  const currentPlacement = ref<Placement>(options.placement ?? 'bottom-start')
  const cleanupAutoUpdate = ref<(() => void) | null>(null)

  const resolveOpen = () => {
    if (typeof options.open === 'object' && options.open !== null && 'value' in options.open) {
      return Boolean(options.open.value)
    }

    return options.open ?? true
  }

  const updatePosition = async () => {
    const anchor = anchorRef.value
    const floating = floatingRef.value

    if (!anchor || !floating || !resolveOpen()) {
      return
    }

    const result = await computePosition(anchor, floating, {
      strategy: 'fixed',
      placement: options.placement ?? 'bottom-start',
      middleware: [
        floatingOffset(options.offset ?? 8),
        flip({
          padding: 8,
        }),
        shift({
          padding: 8,
        }),
        size({
          padding: 8,
          apply({ rects, availableWidth, elements }) {
            elements.floating.style.maxWidth = `${Math.max(160, availableWidth)}px`

            if (options.matchTriggerWidth) {
              elements.floating.style.minWidth = `${rects.reference.width}px`
            }
          },
        }),
      ],
    })

    x.value = result.x
    y.value = result.y
    currentPlacement.value = result.placement
  }

  const stopAutoUpdate = () => {
    cleanupAutoUpdate.value?.()
    cleanupAutoUpdate.value = null
  }

  const startAutoUpdate = async () => {
    stopAutoUpdate()

    await nextTick()

    const anchor = anchorRef.value
    const floating = floatingRef.value

    if (!anchor || !floating || !resolveOpen()) {
      return
    }

    cleanupAutoUpdate.value = autoUpdate(anchor, floating, updatePosition)
    await updatePosition()
  }

  watch(
    () => resolveOpen(),
    async (isOpen) => {
      if (!isOpen) {
        stopAutoUpdate()
        return
      }

      await startAutoUpdate()
    },
    { immediate: true },
  )

  watch([anchorRef, floatingRef], async () => {
    if (!resolveOpen()) {
      return
    }

    await startAutoUpdate()
  })

  onMounted(async () => {
    if (resolveOpen()) {
      await startAutoUpdate()
    }
  })

  onBeforeUnmount(() => {
    stopAutoUpdate()
  })

  watchEffect(() => {
    if (!resolveOpen()) {
      stopAutoUpdate()
    }
  })

  const floatingStyles = computed<CSSProperties>(() => ({
    position: strategy.value,
    left: `${x.value}px`,
    top: `${y.value}px`,
  }))

  return {
    floatingStyles,
    placement: currentPlacement,
    updatePosition,
  }
}
