import { defineComponent } from 'vue-demi'
import { DroppableWidget } from '@formily/antdv-designable'
import { uid } from '@designable/shared'
import './styles.less'

export const Container = defineComponent({
  name: 'DnContainer',
  setup(props, { slots }) {
    return () => {
      return <DroppableWidget key={uid()} scopedSlots={slots}></DroppableWidget>
    }
  },
})

export const withContainer = (Target: any) => {
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
