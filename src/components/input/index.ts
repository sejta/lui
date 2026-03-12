import { computed, defineComponent, h } from 'vue'

export interface UiInputProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  type?: string
}

export const UiInput = defineComponent({
  name: 'UiInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: String,
    disabled: Boolean,
    invalid: Boolean,
    type: {
      type: String,
      default: 'text',
    },
  },
  emits: {
    'update:modelValue': (value: string) => typeof value === 'string',
  },
  setup(props, { emit, attrs }) {
    const className = computed(() => ['lui-control', attrs.class].filter(Boolean).join(' '))

    return () =>
      h('input', {
        ...attrs,
        class: className.value,
        value: props.modelValue,
        type: props.type,
        placeholder: props.placeholder,
        disabled: props.disabled,
        'data-invalid': props.invalid ? 'true' : 'false',
        onInput: (event: Event) => {
          emit('update:modelValue', (event.target as HTMLInputElement).value)
        },
      })
  },
})
