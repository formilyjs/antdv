import { shallowRef, watch } from 'vue-demi'
import { SelectNodeEvent } from '@designable/core'
import { toJS } from '@formily/reactive'
// import { useSelected } from './useSelected'
import { useDesigner } from './useDesigner'
import { useSelection } from './useSelection'
import { useTree } from './useTree'
import { computed as reactiveComputed } from '../shared'

export const useSelectedNode = (workspaceId?: string) => {
  // TODO:: selected changes cause Vue computed to change, however when treenode changes there is no reaction
  // const selected = useSelected(workspaceId)
  const selection = useSelection(workspaceId)
  const selected = shallowRef(selection.value.selected)
  const tree = useTree(workspaceId)

  const designer = useDesigner()

  // https://github.com/alibaba/designable/blob/main/packages/core/src/models/Selection.ts#L50
  // TIPS: treenode changes but same id, selected value will not be changed.
  designer.value.subscribeTo(SelectNodeEvent, () => {
    selected.value = toJS(selection.value.selected)
  })

  return reactiveComputed(() => {
    return tree.value?.findById?.(selected.value[0])
  })
}

/**
 * @deprecated
 * please use useSelectedNode
 */
export const useCurrentNode = useSelectedNode
