import { computed } from 'vue-demi'
import { useDesigner } from './useDesigner'

export const useScreen = () => {
  const designer = useDesigner()
  return computed(() => designer.value?.screen)
}
