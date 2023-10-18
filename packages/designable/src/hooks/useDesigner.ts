import type { Engine } from '@pind/designable-core'
import { isFn } from '@pind/designable-shared'
import type { Ref } from 'vue'
import { inject, onBeforeUnmount, ref } from 'vue'
import { DesignerEngineSymbol } from '../context'
export interface IEffects {
  (engine: Engine): void | (() => void)
}

export const useDesigner = (effects?: IEffects): Ref<Engine> => {
  const designer = window['__DESIGNER_ENGINE__']
    ? ref(window['__DESIGNER_ENGINE__'])
    : inject(DesignerEngineSymbol, ref())

  const unRef = isFn(effects) ? effects(designer.value) : null

  onBeforeUnmount(() => {
    unRef && unRef()
  })
  return designer
}
