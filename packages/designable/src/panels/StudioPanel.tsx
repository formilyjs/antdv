import cls from 'classnames'
import { defineComponent, unref } from 'vue-demi'
import { Layout } from '../containers'
import { usePrefix } from '../hooks'
import type { VNode } from 'vue/types/umd'

export interface IStudioPanelProps {
  logo?: VNode | Vue.FunctionalComponentOptions
  actions?: VNode | Vue.FunctionalComponentOptions
  prefixCls?: string
  theme?: string
}

const StudioPanelInternal = defineComponent({
  setup(props, { attrs, slots }) {
    const prefixRef = usePrefix('main-panel')

    if (slots.logo || slots.actions) {
      return () => {
        const prefix = unref(prefixRef)
        return (
          <div {...{ attrs: attrs }} class={cls(prefix + '-container', 'root')}>
            <div class={prefix + '-header'}>
              <div class={prefix + '-header-logo'}>
                {slots.logo && slots.logo()}
              </div>
              <div class={prefix + '-header-actions'}>
                {slots.actions && slots.actions()}
              </div>
            </div>
            <div class={prefix}>{slots.default?.()}</div>
          </div>
        )
      }
    }

    return () => (
      <div {...{ attrs }} class={cls(prefixRef.value, 'root')}>
        {slots.default?.()}
      </div>
    )
  },
})

export const StudioPanel = defineComponent<IStudioPanelProps>({
  props: {
    theme: { type: String, default: 'light' },
    prefixCls: { type: String, default: 'dn-' },
  },
  setup(props, { slots }) {
    const scopedSlots = {
      logo: slots.logo,
      actions: slots.actions,
    }
    return () => (
      <Layout theme={props.theme} prefixCls={props.prefixCls}>
        <StudioPanelInternal {...{ props, scopedSlots }}>
          {slots.default?.()}
        </StudioPanelInternal>
      </Layout>
    )
  },
})
