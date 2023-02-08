import { defineComponent, unref } from 'vue-demi'
import { Layout } from '../containers'
import { usePrefix, usePosition } from '../hooks'

import type { PropType } from 'vue-demi'
import type { IDesignerLayoutProps } from '../types'

export interface IStudioPanelProps {
  prefixCls?: string
  theme?: IDesignerLayoutProps['theme']
  position?: IDesignerLayoutProps['position']
}

const StudioPanelInternal = defineComponent({
  name: 'DnStudioPanelInternal',
  setup(props, { attrs, slots }) {
    const prefixRef = usePrefix('main-panel')
    const positionRef = usePosition()

    return () => {
      const position = unref(positionRef)
      const prefix = unref(prefixRef)
      if (slots.logo || slots.actions) {
        return (
          <div attrs={attrs} class={[prefix + '-container', 'root', position]}>
            <div class={prefix + '-header'}>
              <div class={prefix + '-header-logo'}>{slots.logo?.()}</div>
              <div class={prefix + '-header-actions'}>{slots.actions?.()}</div>
            </div>
            <div class={prefix}>{slots.default?.()}</div>
          </div>
        )
      } else {
        return (
          <div attrs={attrs} class={[prefix, 'root', position]}>
            {slots.default?.()}
          </div>
        )
      }
    }
  },
})

export const StudioPanel = defineComponent({
  name: 'DnStudioPanel',
  props: {
    prefixCls: { type: String as PropType<string>, default: 'dn-' },
    theme: {
      type: String as PropType<IDesignerLayoutProps['theme']>,
      default: 'light',
    },
    position: {
      type: String as PropType<IDesignerLayoutProps['position']>,
      default: 'fixed',
    },
  },
  setup(props, { slots }) {
    const scopedSlots = {
      logo: slots.logo,
      actions: slots.actions,
    }
    return () => (
      <Layout
        theme={props.theme}
        prefixCls={props.prefixCls}
        position={props.position}
      >
        <StudioPanelInternal scopedSlots={scopedSlots}>
          {slots.default?.()}
        </StudioPanelInternal>
      </Layout>
    )
  },
})
