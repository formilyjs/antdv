import { computed } from 'vue-demi'
import { useOperation } from './useOperation'

export const useOutlineDragon = (workspaceId?: string) => {
  const operation = useOperation(workspaceId)
  return computed(() => operation.value?.outlineDragon)
}
