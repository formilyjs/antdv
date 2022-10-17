import { computed } from 'vue-demi'
import { useDesigner } from './useDesigner'
import { useTreeNode } from './useTreeNode'
import type { TreeNode } from '@designable/core'

export const useNodeIdProps = (node?: TreeNode) => {
  const targetRef = useTreeNode()
  const designerRef = useDesigner()
  return computed(() => {
    return {
      [designerRef.value.props.nodeIdAttrName]: node
        ? node.id
        : targetRef.value.id,
    }
  })
}
