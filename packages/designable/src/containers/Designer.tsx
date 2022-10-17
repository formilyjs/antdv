import { GlobalRegistry } from '@designable/core'
import {
  defineComponent,
  onBeforeUnmount,
  provide,
  ref,
  toRef,
  watchEffect,
} from 'vue-demi'
import { h as CreateElement } from '@formily/vue'
import { DesignerEngineSymbol } from '../context'
import { GhostWidget } from '../widgets'
import { useDesigner } from '../hooks/useDesigner'
import * as icons from '../icons'
import { Layout } from './Layout'
import type { IDesignerProps } from '../types'
import type { Engine } from '@designable/core'

GlobalRegistry.registerDesignerIcons(icons)

export const Designer = defineComponent<IDesignerProps>({
  props: {
    engine: {},
    theme: { type: String, default: 'light' },
    prefixCls: { type: String, default: 'dn-' },
  },
  setup(props, { slots }) {
    const engine = useDesigner()
    const refInstance = ref<Engine>(null)

    provide(DesignerEngineSymbol, toRef(props, 'engine'))

    watchEffect(() => {
      if (props.engine) {
        if (props.engine && refInstance.value) {
          if (props.engine !== refInstance.value) {
            refInstance.value.unmount()
          }
        }
        props.engine.mount()
        refInstance.value = props.engine
      }
    })

    onBeforeUnmount(() => {
      if (props.engine) {
        props.engine.unmount()
      }
    })

    if (engine.value)
      throw new Error(
        'There can only be one Designable Engine Context in the React Tree'
      )

    return () => {
      // eslint-disable-next-line
      const { default: _, ...rest } = slots
      return CreateElement(
        Layout,
        { props: { theme: props.theme, prefixCls: props.prefixCls } },
        {
          ...rest,
          default: () => [
            slots.default?.(),
            CreateElement(GhostWidget, {}, {}),
          ],
        }
      )
    }
    //   < theme={props.theme} prefixCls={props.prefixCls}>
    //     {slots.default?.()}
    //     <GhostWidget />
    //   </Layout>
    // )
  },
})
