import { defineComponent } from 'vue-demi'
import { Breadcrumb } from 'ant-design-vue'
import { FragmentComponent as Fragment } from '@formily/vue'
import { useCurrentNode, useSelection, usePrefix, useHover } from '../../hooks'
import { IconWidget } from '../IconWidget'
import { NodeTitleWidget } from '../NodeTitleWidget'
import './styles.less'

export interface INodePathWidgetProps {
  workspaceId?: string
  maxItems?: number
}

export const NodePathWidget = defineComponent({
  name: 'DnNodePathWidget',
  props: ['workspaceId', 'maxItems'],
  setup(props) {
    const selectedRef = useCurrentNode(props.workspaceId)
    const selectionRef = useSelection(props.workspaceId)
    const hoverRef = useHover(props.workspaceId)
    const prefixRef = usePrefix('node-path')

    return () => {
      if (!selectedRef.value) return <Fragment />
      const maxItems = props.maxItems ?? 3
      const nodes = selectedRef.value
        .getParents()
        .slice(0, maxItems - 1)
        .reverse()
        .concat(selectedRef.value)
      return (
        <Breadcrumb class={prefixRef.value}>
          {nodes.map((node, key) => {
            return (
              <Breadcrumb.Item key={key}>
                {key === 0 && (
                  <IconWidget style={{ marginRight: '3px' }} infer="Position" />
                )}
                <a
                  href=""
                  vOn:mouseenter={() => {
                    hoverRef.value.setHover(node)
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    selectionRef.value.select(node)
                  }}
                >
                  <NodeTitleWidget node={node} />
                </a>
              </Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
      )
    }
  },
})
