import { defineComponent } from 'vue'
import { usePrefix } from '../../hooks'
import './styles.less'
// export interface IPCSimulatorProps extends HTMLDivElement {
//   className?: string
//   style?: any // CSSProperties
// }
export const PCSimulator = defineComponent({
  name: 'DnPCSimulator',
  props: [],
  setup(props, { attrs, slots }) {
    const prefix = usePrefix('pc-simulator')

    return () => {
      return (
        <div
          {...{
            attrs
          }}
          class={prefix.value}
        >
          {slots.default?.()}
        </div>
      )
    }
  }
})
