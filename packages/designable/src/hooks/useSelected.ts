import { observe, toJS } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue-demi'
import { useSelection } from './useSelection'

export const useSelected = (workspaceId?: string) => {
  const selection = useSelection(workspaceId)

  const result = ref(toJS(selection.value?.selected) || [])

  const dispose = observe(selection.value, () => {
    result.value = toJS(selection.value.selected)
  })

  onBeforeUnmount(() => {
    dispose()
  })
  return result
}
