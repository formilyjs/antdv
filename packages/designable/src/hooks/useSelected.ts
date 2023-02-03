import { toJS } from '@formily/reactive'
import { useSelection } from './useSelection'
import { computed as reactiveComputed } from '../shared/reactive'

export const useSelected = (workspaceId?: string) => {
  const selection = useSelection(workspaceId)

  return reactiveComputed(() => {
    return toJS(selection.value.selected)
  })
}
