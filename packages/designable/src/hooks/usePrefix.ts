import { computed, unref } from 'vue'
import { DesignerLayoutSymbol, useContext } from '../context'

export const usePrefix = (after = '') => {
  const DesignerLayoutContext = useContext(DesignerLayoutSymbol)
  const usePrefixContext = computed(() => unref(DesignerLayoutContext)?.prefixCls + after)
  return usePrefixContext
}
