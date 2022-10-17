import { defineComponent } from 'vue-demi'
import { useStyle } from '../shared/util'
import { WorkspacePanel } from './WorkspacePanel'

export const ToolbarPanel = defineComponent({
  setup(props, { slots }) {
    const style = useStyle()
    return () => (
      <WorkspacePanel.Item
        // @ts-ignore
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '4px',
          padding: '0 4px',
          ...style,
        }}
        {...{ props }}
      >
        {slots.default?.()}
      </WorkspacePanel.Item>
    )
  },
})
