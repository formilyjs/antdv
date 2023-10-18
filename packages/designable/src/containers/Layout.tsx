import { each } from '@pind/designable-shared'
import type { PropType } from 'vue'
import { computed, defineComponent, provide, ref, watch } from 'vue'
import type { IDesignerLayoutContext } from '../context'
import { DesignerLayoutSymbol, useContext } from '../context'
import type { IDesignerLayoutProps } from '../types'

export const Layout = defineComponent({
  name: 'DnLayout',
  props: {
    theme: {
      type: String as PropType<IDesignerLayoutProps['theme']>,
      default: 'light'
    },
    prefixCls: {
      type: String as PropType<IDesignerLayoutProps['prefixCls']>,
      default: 'dn-'
    },
    variables: {
      type: Object as PropType<IDesignerLayoutProps['variables']>,
      default: () => ({})
    },
    position: {
      type: String as PropType<IDesignerLayoutProps['position']>,
      default: 'fixed'
    }
  },
  setup(props, { slots = { default: () => null } }) {
    const layoutRef = useContext<IDesignerLayoutContext>(DesignerLayoutSymbol)
    const containerRef = ref<HTMLDivElement>()

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
        position: props.position
      }))
    )

    return () => (
      <div
        ref={containerRef}
        class={{
          [`${props.prefixCls}app`]: true,
          [`${props.prefixCls}${props.theme}`]: props.theme
        }}
      >
        {slots.default?.()}
      </div>
    )
  }
})
