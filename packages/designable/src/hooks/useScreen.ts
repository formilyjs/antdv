import { computed } from 'vue'
import { useDesigner } from './useDesigner'

export const useScreen = () => {
  const designer = useDesigner()
  return computed(() => designer.value?.screen)
}
