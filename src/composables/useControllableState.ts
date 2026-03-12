import { computed, ref, type Ref } from 'vue'

export interface UseControllableStateOptions<T> {
  value?: Ref<T | undefined> | T
  defaultValue?: T
  disabled?: Ref<boolean> | boolean
  onChange?: (value: T) => void
}

export function useControllableState<T>(options: UseControllableStateOptions<T>) {
  const localValue = ref(options.defaultValue) as Ref<T | undefined>

  const resolveValue = () => {
    if (typeof options.value === 'object' && options.value !== null && 'value' in options.value) {
      return options.value.value
    }

    return options.value
  }

  const isControlled = computed(() => resolveValue() !== undefined)
  const isDisabled = computed(() => {
    if (typeof options.disabled === 'object' && options.disabled !== null && 'value' in options.disabled) {
      return Boolean(options.disabled.value)
    }

    return Boolean(options.disabled)
  })

  const currentValue = computed<T | undefined>(() => {
    if (!isControlled.value) {
      return localValue.value
    }

    return resolveValue()
  })

  const setValue = (nextValue: T) => {
    if (isDisabled.value) {
      return
    }

    if (!isControlled.value) {
      localValue.value = nextValue
    }

    options.onChange?.(nextValue)
  }

  return {
    isControlled,
    isDisabled,
    value: currentValue,
    setValue,
  }
}
