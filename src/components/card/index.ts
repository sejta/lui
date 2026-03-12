import { computed, defineComponent, h } from 'vue'

export interface UiCardProps {
  interactive?: boolean
  as?: string
}

export const UiCard = defineComponent({
  name: 'UiCard',
  props: {
    interactive: Boolean,
    as: {
      type: String,
      default: 'section',
    },
  },
  setup(props, { slots, attrs }) {
    const className = computed(() => ['lui-surface', 'lui-card', attrs.class].filter(Boolean).join(' '))

    return () =>
      h(
        props.as,
        {
          ...attrs,
          class: className.value,
          'data-interactive': props.interactive ? 'true' : 'false',
        },
        slots.default?.(),
      )
  },
})
