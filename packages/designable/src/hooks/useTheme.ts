import type { ComputedRef } from 'vue'
import { computed, inject, ref } from 'vue'
import { DesignerLayoutSymbol } from '../context'
import type { IDesignerLayoutContext } from '../types'

export const useTheme = (): ComputedRef<IDesignerLayoutContext['theme']> => {
  return computed(
    () => window['__DESIGNER_THEME__'] || inject(DesignerLayoutSymbol, ref()).value?.theme
  )
}
