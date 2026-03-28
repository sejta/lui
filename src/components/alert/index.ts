import { computed, defineComponent, h, type PropType } from 'vue'

export interface UiAlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
}

export const UiAlert = defineComponent({
  name: 'UiAlert',
  props: {
    variant: {
      type: String as PropType<UiAlertProps['variant']>,
      default: 'info',
    },
    title: String,
  },
  setup(props, { slots, attrs }) {
    const className = computed(() => ['lui-alert', attrs.class].filter(Boolean).join(' '))

    return () =>
      h(
        'div',
        {
          ...attrs,
          class: className.value,
          'data-variant': props.variant,
        },
        [
          h('div', { class: 'lui-alert__body' }, [
            props.title ? h('div', { class: 'lui-alert__title' }, props.title) : null,
            slots.default ? h('div', { class: 'lui-alert__content' }, slots.default()) : null,
          ]),
          slots.actions ? h('div', { class: 'lui-alert__actions' }, slots.actions()) : null,
        ],
      )
  },
})
