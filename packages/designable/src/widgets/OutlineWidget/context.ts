import type { TreeNode } from '@designable/core'
import type { InjectionKey, Ref } from 'vue-demi'

interface INodeContext {
  renderTitle?: (node: TreeNode) => any
  renderActions?: (node: TreeNode) => any
}

export const NodeSymbol: InjectionKey<Ref<INodeContext & any>> =
  Symbol('INodeContext')
