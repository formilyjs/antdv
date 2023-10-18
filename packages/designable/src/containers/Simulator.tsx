import { ScreenType } from '@pind/designable-core'
import { observer } from '@formily/reactive-vue'
import { defineComponent } from 'vue'
import { useScreen } from '../hooks'
import { MobileSimulator, PCSimulator, ResponsiveSimulator } from '../simulators'

export type ISimulatorProps = HTMLDivElement & any

const SimulatorComponent = defineComponent({
  name: 'DnSimulator',
  setup(props, { attrs, slots }) {
    const screenRef = useScreen()
    return () => {
      if (screenRef.value.type === ScreenType.PC)
        return (
          <PCSimulator {...attrs} {...props}>
            {slots.default?.()}
          </PCSimulator>
        )
      if (screenRef.value.type === ScreenType.Mobile)
        return (
          <MobileSimulator {...attrs} {...props}>
            {slots.default?.()}
          </MobileSimulator>
        )
      if (screenRef.value.type === ScreenType.Responsive)
        return (
          <ResponsiveSimulator {...attrs} {...props}>
            {slots.default?.()}
          </ResponsiveSimulator>
        )
      return (
        <PCSimulator {...attrs} {...props}>
          {slots.default?.()}
        </PCSimulator>
      )
    }
  }
})

export const Simulator = observer(SimulatorComponent)
