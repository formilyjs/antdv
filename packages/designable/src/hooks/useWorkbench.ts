import { computed } from 'vue-demi'
import { useDesigner } from './useDesigner'

export const useWorkbench = () => {
  const designer = useDesigner()
  return computed(() => designer.value.workbench)
}
