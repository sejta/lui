import { computed, defineComponent, h, mergeProps, type PropType } from 'vue'

export interface UiRadioItem {
  label: string
  value: string
  description?: string
  disabled?: boolean
}

export interface UiRadioGroupProps {
  modelValue?: string
  items: UiRadioItem[]
  name?: string
  disabled?: boolean
  invalid?: boolean
}

let radioGroupId = 0

export const UiRadioGroup = defineComponent({
  name: 'UiRadioGroup',
  props: {
    modelValue: String,
    items: {
      type: Array as PropType<UiRadioItem[]>,
      required: true,
    },
    name: String,
    disabled: Boolean,
    invalid: Boolean,
  },
  emits: {
    'update:modelValue': (value: string) => typeof value === 'string',
  },
  setup(props, { emit, attrs }) {
    const groupName = props.name ?? `lui-radio-group-${++radioGroupId}`
    const className = computed(() => ['lui-radio-group', attrs.class].filter(Boolean).join(' '))

    return () =>
      h(
        'div',
        mergeProps(attrs, {
          class: className.value,
          role: 'radiogroup',
          'data-invalid': props.invalid ? 'true' : 'false',
          'aria-invalid': props.invalid ? 'true' : undefined,
        }),
        props.items.map((item) =>
          h(
            'label',
            {
              key: item.value,
              class: 'lui-radio',
              'data-disabled': props.disabled || item.disabled ? 'true' : 'false',
            },
            [
              h('input', {
                class: 'lui-radio__input',
                type: 'radio',
                name: groupName,
                value: item.value,
                checked: props.modelValue === item.value,
                disabled: props.disabled || item.disabled,
                onChange: () => {
                  emit('update:modelValue', item.value)
                },
              }),
              h('span', { class: 'lui-radio__control', 'aria-hidden': 'true' }, [
                props.modelValue === item.value ? h('span', { class: 'lui-radio__dot' }) : null,
              ]),
              h('span', { class: 'lui-radio__body' }, [
                h('span', { class: 'lui-radio__label' }, item.label),
                item.description ? h('span', { class: 'lui-radio__description' }, item.description) : null,
              ]),
            ],
          ),
        ),
      )
  },
})
