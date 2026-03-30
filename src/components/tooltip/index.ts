import { computed, defineComponent, h, onBeforeUnmount, ref, Teleport, type PropType } from 'vue'

import { useEscape, useOverlayPosition } from '../../composables'

export interface UiTooltipProps {
  content: string
  placement?: 'top' | 'top-start' | 'top-end' | 'right' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left'
  delay?: number
  disabled?: boolean
}

export const UiTooltip = defineComponent({
  name: 'UiTooltip',
  props: {
    content: {
      type: String,
      required: true,
    },
    placement: {
      type: String as PropType<UiTooltipProps['placement']>,
      default: 'top',
    },
    delay: {
      type: Number,
      default: 180,
    },
    disabled: Boolean,
  },
  setup(props, { slots, attrs }) {
    const anchorRef = ref<HTMLElement | null>(null)
    const floatingRef = ref<HTMLElement | null>(null)
    const openTimer = ref<number | null>(null)
    const isOpen = ref(false)
    const tooltipId = `lui-tooltip-${Math.random().toString(36).slice(2, 10)}`
    const className = computed(() => ['lui-tooltip', attrs.class].filter(Boolean).join(' '))

    const { floatingStyles, placement } = useOverlayPosition(anchorRef, floatingRef, {
      open: isOpen,
      placement: props.placement,
      offset: 8,
    })

    const clearOpenTimer = () => {
      if (openTimer.value === null) {
        return
      }

      window.clearTimeout(openTimer.value)
      openTimer.value = null
    }

    const closeTooltip = () => {
      clearOpenTimer()
      isOpen.value = false
    }

    const scheduleOpen = () => {
      if (props.disabled || !props.content) {
        return
      }

      clearOpenTimer()
      openTimer.value = window.setTimeout(() => {
        isOpen.value = true
        openTimer.value = null
      }, props.delay)
    }

    useEscape(() => {
      closeTooltip()
    }, {
      enabled: isOpen,
      stopPropagation: true,
    })

    onBeforeUnmount(() => {
      clearOpenTimer()
    })

    return () => {
      const trigger = h(
        'span',
        {
          ref: anchorRef,
          ...attrs,
          class: className.value,
          'data-state': isOpen.value ? 'open' : 'closed',
          'aria-describedby': isOpen.value ? tooltipId : undefined,
          onMouseenter: scheduleOpen,
          onMouseleave: closeTooltip,
          onFocusin: scheduleOpen,
          onFocusout: closeTooltip,
        },
        slots.trigger?.(),
      )

      const overlay = isOpen.value
        ? h(Teleport, { to: 'body' }, [
            h(
              'div',
              {
                id: tooltipId,
                ref: floatingRef,
                class: 'lui-tooltip__content',
                style: floatingStyles.value,
                role: 'tooltip',
                'data-placement': placement.value,
                'data-lui-floating': 'true',
              },
              props.content,
            ),
          ])
        : null

      return h('div', { class: 'lui-tooltip__root' }, [trigger, overlay])
    }
  },
})
