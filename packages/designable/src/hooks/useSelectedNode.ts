import { toJS } from '@formily/reactive'
import { SelectNodeEvent } from '@pind/designable-core'
import type { Ref } from 'vue'
import { shallowRef } from 'vue'
import { computed as reactiveComputed } from '../shared'
import { useDesigner } from './useDesigner'
import { useSelection } from './useSelection'
import { useTree } from './useTree'

export const useSelectedNode = (workspaceId?: Ref<string | undefined>) => {
  const selection = useSelection(workspaceId)
  const selected = shallowRef(selection.value.selected)
  const tree = useTree(workspaceId)

  const designer = useDesigner()

  designer.value.subscribeTo(SelectNodeEvent, () => {
    selected.value = toJS(selection.value.selected)
  })

  return reactiveComputed(() => {
    return tree.value?.findById?.(selected.value[0])
  })
}
