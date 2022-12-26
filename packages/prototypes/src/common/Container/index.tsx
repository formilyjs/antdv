import { DroppableWidget } from '@formily/antdv-designable'
import './styles.less'
import { defineComponent } from 'vue-demi'
import { uid } from '@designable/shared'
import type { VueComponent } from '@formily/vue'

export const Container = defineComponent({
  name: 'DnContainer',
  setup(props, { slots }) {
    return () => {
      return <DroppableWidget scopedSlots={slots} key={uid()}></DroppableWidget>
    }
  },
})

export const withContainer = (Target: VueComponent) => {
  return defineComponent({
    setup(props, { attrs, slots }) {
      return () => {
        // eslint-disable-next-line
        const { default: _, ...rest } = slots
        return (
          <DroppableWidget>
            <Target attrs={attrs} scopedSlots={rest}>
              {slots.default?.()}
            </Target>
          </DroppableWidget>
        )
      }
    },
  })
}
