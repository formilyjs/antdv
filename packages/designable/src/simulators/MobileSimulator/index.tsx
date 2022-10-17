import cls from 'classnames'
import { defineComponent } from 'vue-demi'
import { usePrefix } from '../../hooks'
import { MobileBody } from './body'
import './styles.less'

// export interface IMobileSimulatorProps
//   extends React.HTMLAttributes<HTMLDivElement> {
//   className?: string
//   style?: React.CSSProperties
// }

export const MobileSimulator = defineComponent({
  props: [],
  setup(props, { attrs, slots }) {
    const prefixRef = usePrefix('mobile-simulator')
    return () => {
      return (
        <div attrs={attrs} class={cls(prefixRef.value)}>
          <div class={prefixRef.value + '-content'}>
            <MobileBody>{slots.default?.()}</MobileBody>
          </div>
        </div>
      )
    }
  },
})
