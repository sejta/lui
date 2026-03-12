import { computed, defineComponent, h, type PropType } from 'vue'

export interface UiDividerProps {
  orientation?: 'horizontal' | 'vertical'
}

export const UiDivider = defineComponent({
  name: 'UiDivider',
  props: {
    orientation: {
      type: String as PropType<UiDividerProps['orientation']>,
      default: 'horizontal',
    },
  },
  setup(props, { attrs }) {
    const className = computed(() => ['lui-divider', attrs.class].filter(Boolean).join(' '))

    return () =>
      h('div', {
        ...attrs,
        class: className.value,
        role: 'separator',
        'aria-orientation': props.orientation,
        'data-orientation': props.orientation,
      })
  },
})
