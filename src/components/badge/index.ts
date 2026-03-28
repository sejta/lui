import { computed, defineComponent, h, type PropType } from 'vue'

export interface UiBadgeProps {
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
}

export const UiBadge = defineComponent({
  name: 'UiBadge',
  props: {
    variant: {
      type: String as PropType<UiBadgeProps['variant']>,
      default: 'neutral',
    },
    size: {
      type: String as PropType<UiBadgeProps['size']>,
      default: 'md',
    },
  },
  setup(props, { slots, attrs }) {
    const className = computed(() => ['lui-badge', attrs.class].filter(Boolean).join(' '))

    return () =>
      h(
        'span',
        {
          ...attrs,
          class: className.value,
          'data-variant': props.variant,
          'data-size': props.size,
        },
        slots.default?.(),
      )
  },
})
