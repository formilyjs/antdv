import { computed } from 'vue-demi'
import { useCurrentNode } from './useCurrentNode'
import { useSelected } from './useSelected'

export const useCurrentNodeSelected = () => {
  const nodeRef = useCurrentNode()
  const selectedRef = useSelected()
  return computed(
    () =>
      selectedRef.value.length === 1 &&
      nodeRef.value.id === selectedRef.value?.[0]
  )
}
