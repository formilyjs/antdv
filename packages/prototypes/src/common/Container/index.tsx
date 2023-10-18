import { uid } from '@pind/designable-shared'
import { DroppableWidget } from '@formily/antdv-designable'
import { defineComponent } from 'vue'
import './styles.less'

export const Container = defineComponent({
  name: 'DnContainer',
  setup(props, { slots }) {
    return () => {
      return <DroppableWidget key={uid()}>{slots}</DroppableWidget>
    }
  }
})

export const withContainer = (Target: any) => {
  return defineComponent({
    setup(props, { attrs, slots }) {
      return () => {
        return (
          <DroppableWidget>
            <Target {...attrs}>{slots}</Target>
          </DroppableWidget>
        )
      }
    }
  })
}
