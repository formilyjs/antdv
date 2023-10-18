import type { TreeNode } from '@pind/designable-core'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { Button } from 'ant-design-vue'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useOperation, usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'

export interface IDeleteProps {
  node: TreeNode
}

const DeleteComponent = defineComponent({
  name: 'DnDelete',
  props: { node: { type: Object as PropType<TreeNode> } },
  setup(props) {
    const operationRef = useOperation()
    const prefixRef = usePrefix('aux-copy')
    return () => {
      if (props.node === props.node.root) return null
      return (
        <Button
          class={prefixRef.value}
          type="primary"
          onClick={() => {
            operationRef.value.removeNodes([props.node])
          }}
        >
          <IconWidget infer="Remove" />
        </Button>
      )
    }
  }
})
export const Delete = composeExport(DeleteComponent, { displayName: 'Delete' })
