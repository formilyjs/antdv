import type { TreeNode } from '@pind/designable-core'
import type { InjectionKey, Ref } from 'vue'

interface INodeContext {
  renderTitle?: (node: TreeNode) => any
  renderActions?: (node: TreeNode) => any
}

export const NodeSymbol: InjectionKey<Ref<INodeContext & any>> = Symbol('INodeContext')
