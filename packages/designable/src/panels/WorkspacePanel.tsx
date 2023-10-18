import { defineComponent } from 'vue'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { usePrefix } from '../hooks'
import { useStyle } from '../shared/util'

export interface IWorkspaceItemProps {
  flexable?: boolean
}

// export const WorkspacePanel: React.FC & {
//   Item?: React.FC<IWorkspaceItemProps>
// } = (props) => {
//   const prefix = usePrefix('workspace-panel')
//   return <div className={prefix}>{props.children}</div>
// }

const WorkspacePanelComponent = defineComponent({
  name: 'DnWorkspacePanel',
  setup(_props, { slots }) {
    const prefix = usePrefix('workspace-panel')
    return () => <div class={prefix.value}>{slots.default?.()}</div>
  }
})

const WorkspacePanelItem = defineComponent({
  name: 'DnWorkspacePanelItem',
  props: ['flexable'],
  setup(props, { slots }) {
    const prefix = usePrefix('workspace-panel-item')
    return () => {
      const style = useStyle()
      return (
        <div
          class={prefix.value}
          style={{
            ...style,
            flexGrow: props.flexable ? 1 : 0,
            flexShrink: props.flexable ? 1 : 0
          }}
        >
          {slots.default?.()}
        </div>
      )
    }
  }
})

export const WorkspacePanel = composeExport(WorkspacePanelComponent, {
  Item: WorkspacePanelItem
})
