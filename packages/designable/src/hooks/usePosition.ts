import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { IDesignerLayoutContext } from '../types'
import { useLayout } from './useLayout'

export const usePosition = (): ComputedRef<IDesignerLayoutContext['position']> => {
  const layoutRef = useLayout()
  return computed(() => layoutRef.value?.position)
}
