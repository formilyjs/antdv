import { computed } from 'vue-demi'
import { useSelected } from './useSelected'
import { useTree } from './useTree'

export const useCurrentNode = (workspaceId?: string) => {
  // TODO:: selected changes cause Vue computed to change, however when treenode changes there is no reaction
  const selected = useSelected(workspaceId)

  const tree = useTree(workspaceId)

  return computed(() => {
    return tree.value?.findById?.(selected.value[0])
  })
}
