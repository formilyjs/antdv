import type { TreeNode } from '@pind/designable-core'
import { isStr } from '@pind/designable-shared'
import { observer } from '@formily/reactive-vue'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useNodeIdProps, useTreeNode } from '../../hooks'
import type { INodeActionsWidgetActionProps } from '../NodeActionsWidget'
import { NodeActionsWidget } from '../NodeActionsWidget'
import { NodeTitleWidget } from '../NodeTitleWidget'
import './styles.less'

export interface IDroppableWidgetProps {
  node?: TreeNode
  actions?: INodeActionsWidgetActionProps[]
  height?: number
  placeholder?: boolean
  hasChildren?: boolean
}

export const DroppableWidget = observer(
  defineComponent({
    name: 'DnDroppableWidget',
    inheritAttrs: false,
    props: {
      node: { type: Object as PropType<TreeNode> },
      height: {},
      actions: {
        type: Array as PropType<Array<INodeActionsWidgetActionProps>>
      },
      placeholder: { type: Boolean as PropType<boolean>, default: true },
      hasChildren: { type: Boolean as PropType<boolean>, default: undefined }
    },
    setup(props, { slots }) {
      const nodeRef = useTreeNode()
      const nodeIdRef = useNodeIdProps(props.node)

      return () => {
        const target = props.node ?? nodeRef.value
        if (!target) return
        const children = slots.default?.()
        const hasChildren = props.hasChildren ?? (target.children?.length > 0 && children)
        return (
          <div {...nodeIdRef.value}>
            {hasChildren ? (
              children
            ) : props.placeholder ? (
              <div
                style={{
                  height: isStr(props.height) ? props.height : props.height + 'px'
                }}
                class="dn-droppable-placeholder"
              >
                <NodeTitleWidget node={target} />
              </div>
            ) : (
              children
            )}
            {props.actions?.length ? (
              <NodeActionsWidget>
                {props.actions.map((action, key) => (
                  <NodeActionsWidget.Action {...{ props: action }} key={key} />
                ))}
              </NodeActionsWidget>
            ) : null}
          </div>
        )
      }
    }
  })
  //   ({ node, actions, height, style, className, ...props }) => {

  // }
)
