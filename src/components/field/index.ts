import { computed, defineComponent, h, useId } from 'vue'

export interface UiFieldProps {
  label?: string
  description?: string
  error?: string
  disabled?: boolean
}

export const UiField = defineComponent({
  name: 'UiField',
  props: {
    label: String,
    description: String,
    error: String,
    disabled: Boolean,
  },
  setup(props, { slots, attrs }) {
    const fieldId = useId()
    const className = computed(() => ['lui-field', attrs.class].filter(Boolean).join(' '))
    const labelId = `${fieldId}-label`
    const descriptionId = `${fieldId}-description`
    const errorId = `${fieldId}-error`

    return () =>
      h(
        'div',
        {
          ...attrs,
          class: className.value,
          'data-disabled': props.disabled ? 'true' : 'false',
          'data-invalid': props.error ? 'true' : 'false',
        },
        [
          props.label ? h('div', { id: labelId, class: 'lui-field__label' }, props.label) : null,
          props.description ? h('p', { id: descriptionId, class: 'lui-field__description' }, props.description) : null,
          h(
            'div',
            { class: 'lui-field__control' },
            slots.default?.({
              controlId: `${fieldId}-control`,
              labelledBy: props.label ? labelId : undefined,
              describedBy: [props.description ? descriptionId : null, props.error ? errorId : null].filter(Boolean).join(' ') || undefined,
              invalid: Boolean(props.error),
              disabled: props.disabled,
            }),
          ),
          props.error ? h('p', { id: errorId, class: 'lui-field__error', role: 'alert' }, props.error) : null,
        ],
      )
  },
})
