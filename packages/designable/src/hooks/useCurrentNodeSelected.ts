import { computed } from 'vue'
import { useSelectedNode } from './useSelectedNode'
import { useSelected } from './useSelected'

export const useCurrentNodeSelected = () => {
  const nodeRef = useSelectedNode()
  const selectedRef = useSelected()
  return computed(
    () => selectedRef.value.length === 1 && nodeRef.value.id === selectedRef.value?.[0]
  )
}
