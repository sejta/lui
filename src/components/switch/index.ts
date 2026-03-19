import { computed, defineComponent, h, mergeProps } from 'vue'

export interface UiSwitchProps {
  modelValue?: boolean
  disabled?: boolean
  invalid?: boolean
}

export const UiSwitch = defineComponent({
  name: 'UiSwitch',
  props: {
    modelValue: Boolean,
    disabled: Boolean,
    invalid: Boolean,
  },
  emits: {
    'update:modelValue': (value: boolean) => typeof value === 'boolean',
  },
  setup(props, { emit, slots, attrs }) {
    const className = computed(() => ['lui-switch', attrs.class].filter(Boolean).join(' '))

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
              class: 'lui-switch__input',
              type: 'checkbox',
              role: 'switch',
              checked: props.modelValue,
              disabled: props.disabled,
              'aria-invalid': props.invalid ? 'true' : undefined,
              onChange: (event: Event) => {
                emit('update:modelValue', (event.target as HTMLInputElement).checked)
              },
            }),
          ),
          h('span', { class: 'lui-switch__control', 'aria-hidden': 'true' }, [
            h('span', { class: 'lui-switch__thumb' }),
          ]),
          slots.default ? h('span', { class: 'lui-switch__label' }, slots.default()) : null,
        ],
      )
  },
})
