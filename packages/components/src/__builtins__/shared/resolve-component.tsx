import type { DefineComponent } from 'vue'
import { toRaw } from 'vue'
import type { SlotTypes } from './types'
import { isVnode } from './utils'

export const resolveComponent = (child?: SlotTypes, props?: Record<string, any>) => {
  if (child) {
    if (typeof child === 'string' || typeof child === 'number') {
      return child
    } else if (isVnode(child)) {
      return child
    } else {
      const Com = toRaw(child as DefineComponent)
      return <Com {...props} />
    }
  }

  return null
}
