import {
  defineComponent,
  provide,
  inject,
  readonly,
  ref,
  toRef,
} from 'vue-demi'

import type { InjectionKey, Ref } from 'vue-demi'
import type { DefineComponent } from '@formily/vue'

export type CreateContext<T> = {
  Provider: DefineComponent<{ value: any }>
  Consumer: DefineComponent<{}>
  injectKey: InjectionKey<Ref<T>>
}

export const createContext = <T>(defaultValue?: T): CreateContext<T> => {
  const injectKey: InjectionKey<Ref<T>> = Symbol()

  return {
    Provider: defineComponent({
      name: 'ContextProvider',
      props: {
        value: {
          type: null,
          default() {
            return defaultValue ?? null
          },
        },
      },
      setup(props, { slots }) {
        const value = toRef(props, 'value')
        provide(injectKey, readonly(value))
        return () => slots?.default?.()
      },
    }),

    Consumer: defineComponent({
      name: 'ContextConsumer',
      setup(_props, { slots }) {
        const value = inject(injectKey)

        return () => slots?.default?.(value)
      },
    }),
    injectKey,
  }
}

export const useContext = <T>(context: CreateContext<T>): Ref<T> => {
  const key = context.injectKey

  return inject(key, ref(null))
}
