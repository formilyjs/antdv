import { toJS } from '@formily/reactive'
import type { Ref } from '../shared/reactive'
import { computed as reactiveComputed } from '../shared/reactive'
import { useSelection } from './useSelection'

export const useSelected = (workspaceId?: Ref<string | undefined>) => {
  const selection = useSelection(workspaceId)

  return reactiveComputed(() => {
    return toJS(selection.value.selected)
  })
}
