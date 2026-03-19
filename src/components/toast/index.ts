import { computed, defineComponent, h, type PropType } from 'vue'

import { dismissToast, type UiToastRecord } from '../../composables/useToast'
import { useToast } from '../../composables'

export const UiToast = defineComponent({
  name: 'UiToast',
  props: {
    toast: {
      type: Object as PropType<UiToastRecord>,
      required: true,
    },
  },
  setup(props) {
    const className = computed(() => ['lui-toast', props.toast.showCloseButton ? 'lui-toast--closable' : null].filter(Boolean).join(' '))

    return () =>
      h(
        'div',
        {
          class: className.value,
          'data-type': props.toast.type,
          role: props.toast.type === 'error' ? 'alert' : 'status',
        },
        [
          h('div', { class: 'lui-toast__body' }, [
            h('div', { class: 'lui-toast__title' }, props.toast.title),
            props.toast.description ? h('p', { class: 'lui-toast__description' }, props.toast.description) : null,
          ]),
          props.toast.showCloseButton
            ? h(
                'button',
                {
                  class: 'lui-toast__close',
                  type: 'button',
                  'aria-label': 'Dismiss notification',
                  onClick: () => {
                    dismissToast(props.toast.id)
                  },
                },
                '×',
              )
            : null,
        ],
      )
  },
})

export const UiToastViewport = defineComponent({
  name: 'UiToastViewport',
  setup() {
    const { toasts } = useToast()

    return () =>
      h(
        'div',
        {
          class: 'lui-toast-viewport',
          'aria-live': 'polite',
          'aria-atomic': 'false',
        },
        toasts.value.map((toast) =>
          h(UiToast, {
            key: toast.id,
            toast,
          }),
        ),
      )
  },
})
