import { inject, ref } from 'vue-demi'
import type { TreeNode, Engine } from '@designable/core'
import type { InjectionKey, Ref } from 'vue-demi'
import type {
  IDesignerLayoutContext,
  IWorkspaceContext,
  IDesignerComponents,
} from './types'
export * from './types'

export const DesignerComponentsSymbol: InjectionKey<Ref<IDesignerComponents>> =
  Symbol('DesignerComponentsSymbol')

export const DesignerLayoutSymbol: InjectionKey<Ref<IDesignerLayoutContext>> =
  Symbol('DesignerLayoutSymbol')

export const DesignerEngineSymbol: InjectionKey<Ref<Engine>> = Symbol(
  'DesignerEngineSymbol'
)

export const TreeNodeSymbol: InjectionKey<Ref<TreeNode>> =
  Symbol('TreeNodeSymbol')

export const WorkspaceSymbol: InjectionKey<Ref<IWorkspaceContext>> =
  Symbol('WorkspaceSymbol')

export function useContext<T>(key: InjectionKey<Ref<T>>) {
  return inject(key, ref())
}
