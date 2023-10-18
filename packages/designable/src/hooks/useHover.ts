import type { Ref } from 'vue'
import { computed } from 'vue'
import { useOperation } from './useOperation'

export const useHover = (workspaceId?: Ref<string | undefined>) => {
  const operation = useOperation(workspaceId)
  return computed(() => operation.value?.hover)
}
