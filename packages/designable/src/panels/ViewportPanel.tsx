import { defineComponent } from 'vue-demi'
import { Simulator } from '../containers'
import { WorkspacePanel } from './WorkspacePanel'

export const ViewportPanel = defineComponent({
  name: 'DnViewportPanel',
  setup(props, { slots }) {
    return () => {
      return (
        <WorkspacePanel.Item flexable={true}>
          <Simulator> {slots.default?.()} </Simulator>
        </WorkspacePanel.Item>
      )
    }
  },
})
