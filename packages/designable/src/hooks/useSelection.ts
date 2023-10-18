import type { Ref } from 'vue'
import { computed } from 'vue'
import { useOperation } from './useOperation'

export const useSelection = (workspaceId?: Ref<string>) => {
  const operation = useOperation(workspaceId)
  return computed(() => operation.value?.selection)
}
