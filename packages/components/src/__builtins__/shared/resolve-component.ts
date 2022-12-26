import { h, toRaw } from 'vue-demi'
import { isVnode } from './utils'
import type { SlotTypes } from '.'
import type { Component } from 'vue'

export const resolveComponent = (
  child?: SlotTypes,
  props?: Record<string, any>
) => {
  if (child) {
    if (typeof child === 'string' || typeof child === 'number') {
      return child
    } else if (typeof child === 'function') {
      // eslint-disable-next-line @typescript-eslint/ban-types
      return (child as Function)(props)
    } else if (isVnode(child)) {
      return child
    } else {
      return h(toRaw(child as Component), { props })
    }
  }

  return null
}
