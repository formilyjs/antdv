import { defineComponent, provide, computed, watch } from 'vue-demi'
import { each } from '@designable/shared'
import { DesignerLayoutSymbol, useContext } from '../context'

import type { PropType } from 'vue-demi'
import type { IDesignerLayoutProps } from '../types'
import type { IDesignerLayoutContext } from '../context'

export const Layout = defineComponent({
  name: 'DnLayout',
  props: {
    theme: {
      type: String as PropType<IDesignerLayoutProps['theme']>,
      default: 'light',
    },
    prefixCls: {
      type: String as PropType<IDesignerLayoutProps['prefixCls']>,
      default: 'dn-',
    },
    variables: {
      type: Object as PropType<IDesignerLayoutProps['variables']>,
      default: () => ({}),
    },
    position: {
      type: String as PropType<IDesignerLayoutProps['position']>,
      default: 'fixed',
    },
  },
  setup(props, { slots = { default: () => null }, refs }) {
    const layoutRef = useContext<IDesignerLayoutContext>(DesignerLayoutSymbol)
    const containerRef = computed<HTMLDivElement>(
      () => refs.container as HTMLDivElement
    )

    watch(containerRef, () => {
      if (containerRef.value) {
        each(props.variables!, (value, key) => {
          containerRef.value?.style?.setProperty(`--${key}`, value)
        })
      }
    })

    if (layoutRef.value) {
      return () => {
        return slots.default?.()
      }
    }

    provide(
      DesignerLayoutSymbol,
      computed(() => ({
        theme: props.theme,
        prefixCls: props.prefixCls,
        position: props.position,
      }))
    )

    return () => (
      <div
        ref="container"
        class={{
          [`${props.prefixCls}app`]: true,
          [`${props.prefixCls}${props.theme}`]: props.theme,
        }}
      >
        {slots.default?.()}
      </div>
    )
  },
})
