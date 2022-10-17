import { computed } from 'vue-demi'
import { useWorkspace } from './useWorkspace'

export const useOutline = (workspaceId?: string) => {
  const workspace = useWorkspace(workspaceId)
  return computed(() => workspace.value?.outline)
}
