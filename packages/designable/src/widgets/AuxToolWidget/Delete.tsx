import { defineComponent } from 'vue-demi'
import { Button } from 'ant-design-vue'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { useOperation, usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'

import type { PropType } from 'vue-demi'
import type { TreeNode } from '@designable/core'

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
  },
})
export const Delete = composeExport(DeleteComponent, { displayName: 'Delete' })
