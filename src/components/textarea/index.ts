import { computed, defineComponent, h } from 'vue'

export interface UiTextareaProps {
  modelValue?: string
  placeholder?: string
  rows?: number
  disabled?: boolean
  invalid?: boolean
}

export const UiTextarea = defineComponent({
  name: 'UiTextarea',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: String,
    rows: {
      type: Number,
      default: 4,
    },
    disabled: Boolean,
    invalid: Boolean,
  },
  emits: {
    'update:modelValue': (value: string) => typeof value === 'string',
  },
  setup(props, { emit, attrs }) {
    const className = computed(() => ['lui-control', attrs.class].filter(Boolean).join(' '))

    return () =>
      h(
        'textarea',
        {
          ...attrs,
          class: className.value,
          rows: props.rows,
          placeholder: props.placeholder,
          disabled: props.disabled,
          'data-invalid': props.invalid ? 'true' : 'false',
          onInput: (event: Event) => {
            emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
          },
        },
        props.modelValue,
      )
  },
})
