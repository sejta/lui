import { computed, defineComponent, h } from 'vue'

export interface UiPanelProps {
  title?: string
  as?: string
}

export const UiPanel = defineComponent({
  name: 'UiPanel',
  props: {
    title: String,
    as: {
      type: String,
      default: 'section',
    },
  },
  setup(props, { slots, attrs }) {
    const className = computed(() => ['lui-surface', 'lui-panel', attrs.class].filter(Boolean).join(' '))

    return () =>
      h(props.as, { ...attrs, class: className.value }, [
        props.title || slots.header
          ? h('div', { class: 'lui-panel__header' }, [
              h('div', { class: 'lui-title' }, slots.header?.() ?? props.title),
              slots.actions?.(),
            ])
          : null,
        slots.default?.(),
      ])
  },
})
