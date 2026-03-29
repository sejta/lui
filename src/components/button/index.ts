import { computed, defineComponent, h, type PropType } from 'vue'

export interface UiButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const UiButton = defineComponent({
  name: 'UiButton',
  props: {
    variant: {
      type: String as PropType<UiButtonProps['variant']>,
      default: 'primary',
    },
    size: {
      type: String as PropType<UiButtonProps['size']>,
      default: 'md',
    },
    disabled: Boolean,
    loading: Boolean,
    type: {
      type: String as PropType<UiButtonProps['type']>,
      default: 'button',
    },
  },
  setup(props, { slots, attrs }) {
    const className = computed(() => ['lui-button', attrs.class].filter(Boolean).join(' '))

    return () =>
      h(
        'button',
        {
          ...attrs,
          class: className.value,
          type: props.type,
          disabled: props.disabled || props.loading,
          'data-variant': props.variant,
          'data-size': props.size,
          'data-loading': props.loading ? 'true' : undefined,
          'aria-busy': props.loading ? 'true' : undefined,
        },
        slots.default?.(),
      )
  },
})
