import { defineComponent } from 'vue-demi'
import { Simulator } from '../containers'
import { WorkspacePanel } from './WorkspacePanel'

export const ViewportPanel = defineComponent({
  name: 'DnViewportPanel',
  setup(props, { attrs, slots }) {
    return () => {
      return (
        <WorkspacePanel.Item
          // attrs={attrs}
          flexable={true}
        >
          <Simulator> {slots.default?.()} </Simulator>
        </WorkspacePanel.Item>
      )
    }
  },
})
