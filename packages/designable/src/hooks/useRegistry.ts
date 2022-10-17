import { GlobalRegistry } from '@designable/core'
import type { IDesignerRegistry } from '@designable/core'

export const useRegistry = (): IDesignerRegistry => {
  return window['__DESIGNER_REGISTRY__'] || GlobalRegistry
}
