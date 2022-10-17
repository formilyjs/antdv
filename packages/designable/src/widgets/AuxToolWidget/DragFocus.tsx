import { observer } from '@formily/reactive-vue'
import { Button } from 'ant-design-vue'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { defineComponent } from 'vue-demi'

// Types
import { useOperation, usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'
import type { TreeNode } from '@designable/core'

export interface IDragFocusProps {
  node: TreeNode
}

const DragFocusComponent = observer(
  defineComponent({
    props: ['node'],
    setup(props) {
      const operationRef = useOperation()
      const prefixRef = usePrefix('aux-focus')
      return () => {
        if (props.node === props.node.root) return null
        return (
          <Button
            class={prefixRef.value}
            type="primary"
            onClick={() => {
              operationRef.value.switchFocusNode(props.node)
            }}
          >
            <IconWidget
              infer={
                operationRef.value.focusNode === props.node ? 'Move' : 'Focus'
              }
            />
          </Button>
        )
      }
    },
  })
)

export const DragFocus = composeExport(DragFocusComponent, {
  displayName: 'DragFocus',
})
