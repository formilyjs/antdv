import type { ComputedRef } from 'vue'
import { inject, ref } from 'vue'
import { DesignerLayoutSymbol } from '../context'
import type { IDesignerLayoutContext } from '../types'

export const useLayout = (): ComputedRef<IDesignerLayoutContext> => {
  return window['__DESIGNABLE_LAYOUT__']
    ? ref(window['__DESIGNABLE_LAYOUT__'])
    : inject(DesignerLayoutSymbol, ref())
}
