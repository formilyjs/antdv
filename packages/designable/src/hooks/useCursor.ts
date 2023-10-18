import { computed } from 'vue'
import { useDesigner } from './useDesigner'

export const useCursor = () => {
  const designer = useDesigner()
  return computed(() => designer.value?.cursor)
}
