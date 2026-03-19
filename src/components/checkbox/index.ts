import { computed, defineComponent, h, mergeProps } from 'vue'

export interface UiCheckboxProps {
  modelValue?: boolean
  disabled?: boolean
  invalid?: boolean
}

export const UiCheckbox = defineComponent({
  name: 'UiCheckbox',
  props: {
    modelValue: Boolean,
    disabled: Boolean,
    invalid: Boolean,
  },
  emits: {
    'update:modelValue': (value: boolean) => typeof value === 'boolean',
  },
  setup(props, { emit, slots, attrs }) {
    const className = computed(() => ['lui-checkbox', attrs.class].filter(Boolean).join(' '))

    return () =>
      h(
        'label',
        {
          class: className.value,
          'data-disabled': props.disabled ? 'true' : 'false',
          'data-invalid': props.invalid ? 'true' : 'false',
        },
        [
          h(
            'input',
            mergeProps(attrs, {
              class: 'lui-checkbox__input',
              type: 'checkbox',
              checked: props.modelValue,
              disabled: props.disabled,
              'aria-invalid': props.invalid ? 'true' : undefined,
              onChange: (event: Event) => {
                emit('update:modelValue', (event.target as HTMLInputElement).checked)
              },
            }),
          ),
          h('span', { class: 'lui-checkbox__control', 'aria-hidden': 'true' }, [
            props.modelValue ? h('span', { class: 'lui-checkbox__mark' }) : null,
          ]),
          slots.default ? h('span', { class: 'lui-checkbox__label' }, slots.default()) : null,
        ],
      )
  },
})
