import { computed, defineComponent, h, ref, toRef, type PropType } from 'vue'

import { useControllableState, useRovingTabindex } from '../../composables'

export interface UiTabsItem {
  label: string
  value: string
  disabled?: boolean
}

export interface UiTabsProps {
  items: UiTabsItem[]
  modelValue?: string
  defaultValue?: string
  orientation?: 'horizontal' | 'vertical'
}

export const UiTabs = defineComponent({
  name: 'UiTabs',
  props: {
    items: {
      type: Array as PropType<UiTabsItem[]>,
      required: true,
    },
    modelValue: String,
    defaultValue: String,
    orientation: {
      type: String as PropType<UiTabsProps['orientation']>,
      default: 'horizontal',
    },
  },
  emits: {
    'update:modelValue': (value: string) => typeof value === 'string',
    change: (value: string) => typeof value === 'string',
  },
  setup(props, { emit, slots, attrs }) {
    const tablistRef = ref<HTMLElement | null>(null)

    const state = useControllableState<string>({
      value: toRef(props, 'modelValue'),
      defaultValue: props.defaultValue ?? props.items[0]?.value,
      onChange: (value) => {
        emit('update:modelValue', value)
        emit('change', value)
      },
    })

    const activeValue = computed(() => state.value.value ?? props.items[0]?.value ?? '')
    const activeItem = computed(() => props.items.find((item) => item.value === activeValue.value) ?? props.items[0] ?? null)
    const className = computed(() => ['lui-tabs', attrs.class].filter(Boolean).join(' '))

    const selectTab = (value: string, disabled?: boolean) => {
      if (disabled) {
        return
      }

      state.setValue(value)
    }

    useRovingTabindex(tablistRef, {
      orientation: toRef(props, 'orientation') as ReturnType<typeof toRef<'horizontal' | 'vertical'>>,
      itemSelector: '.lui-tabs__tab:not([disabled])',
      onFocusItem: (el) => {
        const value = (el as HTMLElement & { dataset: DOMStringMap }).dataset.value
        if (value) selectTab(value)
      },
    })

    return () =>
      h('div', { ...attrs, class: className.value, 'data-orientation': props.orientation }, [
        h(
          'div',
          {
            ref: tablistRef,
            class: 'lui-tabs__list',
            role: 'tablist',
            'aria-orientation': props.orientation,
            'data-orientation': props.orientation,
          },
          props.items.map((item) =>
            h(
              'button',
              {
                key: item.value,
                class: 'lui-tabs__tab',
                type: 'button',
                role: 'tab',
                disabled: item.disabled,
                tabindex: item.value === activeValue.value ? 0 : -1,
                'data-value': item.value,
                'data-active': item.value === activeValue.value ? 'true' : 'false',
                'aria-selected': item.value === activeValue.value,
                onClick: () => selectTab(item.value, item.disabled),
              },
              item.label,
            ),
          ),
        ),
        h(
          'div',
          {
            class: 'lui-tabs__panel',
            role: 'tabpanel',
          },
          slots.default?.({ item: activeItem.value }),
        ),
      ])
  },
})
