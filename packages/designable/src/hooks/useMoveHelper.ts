import type { Ref } from '../shared'
import { computed as reactiveComputed } from '../shared'
import { useOperation } from './useOperation'

export const useMoveHelper = (workspaceId?: Ref<string | undefined>) => {
  const operation = useOperation(workspaceId)
  return reactiveComputed(() => operation.value?.moveHelper)
}
