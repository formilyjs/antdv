import { defineComponent } from 'vue-demi'
import { useStyle } from '../shared/util'
import { WorkspacePanel } from './WorkspacePanel'

export const ToolbarPanel = defineComponent({
  name: 'DnToolbarPanel',
  setup(props, { slots }) {
    const style = useStyle()
    return () => (
      <WorkspacePanel.Item
        {...{ props }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '4px',
          padding: '0 4px',
          ...style,
        }}
      >
        {slots.default?.()}
      </WorkspacePanel.Item>
    )
  },
})
