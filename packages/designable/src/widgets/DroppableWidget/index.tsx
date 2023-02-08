import { defineComponent } from 'vue-demi'
import { isStr } from '@designable/shared'
import { observer } from '@formily/reactive-vue'
import { useTreeNode, useNodeIdProps } from '../../hooks'
import { NodeTitleWidget } from '../NodeTitleWidget'
import { NodeActionsWidget } from '../NodeActionsWidget'
import './styles.less'

import type { PropType } from 'vue-demi'
import type { TreeNode } from '@designable/core'
import type { INodeActionsWidgetActionProps } from '../NodeActionsWidget'

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
        type: Array as PropType<Array<INodeActionsWidgetActionProps>>,
      },
      placeholder: { type: Boolean as PropType<boolean>, default: true },
      hasChildren: { type: Boolean as PropType<boolean>, default: undefined },
    },
    setup(props, { slots }) {
      const nodeRef = useTreeNode()
      const nodeIdRef = useNodeIdProps(props.node)

      return () => {
        const target = props.node ?? nodeRef.value
        if (!target) return
        const children = slots.default?.()
        const hasChildren =
          props.hasChildren ?? (target.children?.length > 0 && children)
        return (
          <div attrs={{ ...nodeIdRef.value }}>
            {hasChildren ? (
              children
            ) : props.placeholder ? (
              <div
                style={{
                  height: isStr(props.height)
                    ? props.height
                    : props.height + 'px',
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
    },
  })
  //   ({ node, actions, height, style, className, ...props }) => {

  // }
)
