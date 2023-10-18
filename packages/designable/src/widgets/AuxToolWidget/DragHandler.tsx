import type { TreeNode } from '@pind/designable-core'
import { observer } from '@formily/reactive-vue'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { Button } from 'ant-design-vue'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useDesigner, usePrefix } from '../../hooks'
import { useStyle } from '../../shared'
import { IconWidget } from '../IconWidget'

export interface IDragHandlerProps {
  node: TreeNode
}

const DragHandlerComponent = observer(
  defineComponent({
    name: 'DnDragHandler',
    props: { node: { type: Object as PropType<TreeNode> } },
    setup(props) {
      const designerRef = useDesigner()
      const style = useStyle()
      const prefixRef = usePrefix('aux-drag-handler')

      return () => {
        const node = props.node!
        if (node === node.root || !node.allowDrag()) return null
        const handlerProps = {
          [designerRef.value.props.nodeDragHandlerAttrName!]: 'true'
        }
        return (
          <Button {...handlerProps} type="primary" class={prefixRef.value} style={style}>
            <IconWidget infer="Move" />
          </Button>
        )
      }
    }
  })
)

export const DragHandler = composeExport(DragHandlerComponent, {
  displayName: 'DragHandler'
})
