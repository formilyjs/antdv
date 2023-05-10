import type { AntdComponent } from 'ant-design-vue/types/component'
import type Vue from 'vue'
import type { PropOptions } from 'vue'

type Constructor<T> = new (...args: any[]) => T
type OmitVue<T> = Omit<T, keyof InstanceType<typeof Vue>>
export type AntdProps<T> = {
  [K in keyof OmitVue<T>]: PropOptions<T[K]>
}

export function mergeAntdProps<
  Component extends AntdComponent,
  P extends Record<string, PropOptions>
>(antdComponent: Constructor<Component>, props: P): AntdProps<Component> & P {
  const antdProps = (antdComponent as any).props
  return {
    ...antdProps,
    ...props,
  }
}
