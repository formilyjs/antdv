import { isFn } from '@designable/shared'
import { inject, onBeforeUnmount, ref } from 'vue-demi'
import { DesignerEngineSymbol } from '../context'
import type { Ref } from 'vue-demi'
import type { Engine } from '@designable/core'
export interface IEffects {
  (engine: Engine): void
}

export const useDesigner = (effects?: IEffects): Ref<Engine> => {
  const designer = window['__DESINGER_ENGINE__']
    ? ref(window['__DESINGER_ENGINE__'])
    : inject(DesignerEngineSymbol, ref())

  const unRef = isFn(effects) ? effects(designer.value) : null

  onBeforeUnmount(() => {
    unRef && unRef()
  })
  return designer
}
