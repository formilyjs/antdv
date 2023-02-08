import {
  defineComponent,
  onBeforeUnmount,
  provide,
  ref,
  toRef,
  watchEffect,
} from 'vue-demi'
import { GlobalRegistry } from '@designable/core'
import { DesignerEngineSymbol } from '../context'
import { GhostWidget } from '../widgets'
import { useDesigner } from '../hooks/useDesigner'
import * as icons from '../icons'
import { Layout } from './Layout'

import type { PropType } from 'vue-demi'
import type { IDesignerProps } from '../types'
import type { Engine } from '@designable/core'

GlobalRegistry.registerDesignerIcons(icons)

export const Designer = defineComponent({
  name: 'DnDesigner',
  props: {
    engine: {
      type: Object as PropType<IDesignerProps['engine']>,
    },
    theme: {
      type: String as PropType<IDesignerProps['theme']>,
      default: 'light',
    },
    prefixCls: {
      type: String as PropType<IDesignerProps['prefixCls']>,
      default: 'dn-',
    },
    variables: {
      type: Object as PropType<IDesignerProps['variables']>,
      default: () => ({}),
    },
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
        'There can only be one Designable Engine Context in the Vue Tree'
      )

    return () => {
      return (
        <Layout
          theme={props.theme}
          prefixCls={props.prefixCls}
          variables={props.variables}
        >
          {slots.default?.()}
          <GhostWidget />
        </Layout>
      )
    }
  },
})
