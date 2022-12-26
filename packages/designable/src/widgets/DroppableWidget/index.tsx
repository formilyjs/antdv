import { defineComponent } from 'vue-demi'
import { observer } from '@formily/reactive-vue'
import { useTreeNode, useNodeIdProps } from '../../hooks'
import { NodeTitleWidget } from '../NodeTitleWidget'
import { NodeActionsWidget } from '../NodeActionsWidget'
import './styles.less'
import type { TreeNode } from '@designable/core'

export interface IDroppableWidgetProps {
  node?: TreeNode
  actions?: Record<string, any>[]
  height?: number
  hasChildren?: boolean
}

export const DroppableWidget = observer(
  defineComponent({
    name: 'DnDroppableWidget',
    props: ['node', 'actions', 'height', 'hasChildren'],
    setup(props: IDroppableWidgetProps, { slots }) {
      const currentNodeRef = useTreeNode()
      const nodeIdRef = useNodeIdProps(props.node)

      return () => {
        const target = props.node ?? currentNodeRef.value
        const hasChildren = props.hasChildren ?? target.children?.length > 0
        return (
          <div attrs={{ ...nodeIdRef.value }}>
            {hasChildren ? (
              slots.default?.()
            ) : (
              <div
                style={{ height: props.height + 'px' }}
                class="dn-droppable-placeholder"
              >
                <NodeTitleWidget node={target} />
              </div>
            )}
            {props.actions?.length ? (
              <NodeActionsWidget>
                {props.actions.map((action) => (
                  <NodeActionsWidget.Action
                    {...{ props: action }}
                    // key={key}
                  />
                ))}
              </NodeActionsWidget>
            ) : null}
          </div>
        )
      }
    },
  })
  //   ({ node, actions, height, style, className, ...props }) => {

  // }
)
