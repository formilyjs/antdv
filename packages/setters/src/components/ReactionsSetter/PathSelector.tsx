import { TreeSelect } from 'ant-design-vue'
import { defineComponent } from 'vue-demi'
import { useCurrentNode } from '@formily/antdv-designable'
import type { TreeSelectProps } from 'ant-design-vue/es/tree-select/interface'
import type { TreeNode } from '@designable/core'

export interface IPathSelectorProps extends Omit<TreeSelectProps, 'onChange'> {
  value?: string
  onChange?: (value: string, node: TreeNode) => void
  style?: Record<string, any>
  className?: string
}

const transformDataSource = (node: TreeNode) => {
  const currentNode = node
  const dots = (count: number) => {
    let dots = ''
    for (let i = 0; i < count; i++) {
      dots += '.'
    }
    return dots
  }
  const targetPath = (parentNode: TreeNode, targetNode: TreeNode) => {
    const path: Array<string> = []
    const transform = (node: TreeNode) => {
      if (node && node !== parentNode) {
        path.push(node.props?.name || node.id)
      } else {
        transform(node.parent)
      }
    }
    transform(targetNode)
    return path.reverse().join('.')
  }
  const hasNoVoidChildren: (node: TreeNode) => boolean | undefined = (
    node: TreeNode
  ) => {
    return node.children?.some((node) => {
      if (node.props?.type !== 'void' && node !== currentNode) return true
      return hasNoVoidChildren(node)
    })
  }
  const findRoot = (node: TreeNode): TreeNode => {
    if (!node?.parent) return node
    if (node?.parent?.componentName !== node.componentName) return node.parent
    return findRoot(node.parent)
  }
  const findArrayParent: (node: TreeNode) => TreeNode | undefined = (
    node: TreeNode
  ) => {
    if (!node?.parent) return
    if (node.parent.props?.type === 'array') return node.parent
    if (node.parent === root) return
    return findArrayParent(node.parent)
  }
  const transformRelativePath = (arrayNode: TreeNode, targetNode: TreeNode) => {
    if (targetNode.depth === currentNode.depth)
      return `.${targetNode.props?.name || targetNode.id}`
    return `${dots(currentNode.depth - arrayNode.depth)}[].${targetPath(
      arrayNode,
      targetNode
    )}`
  }
  const transformChildren: (
    node: TreeNode[],
    path?: string[]
  ) => {
    label: string | undefined
    value: any
    node: any
    children: any[]
  }[] = (children: TreeNode[], path = []) => {
    return children.reduce((buf, node) => {
      if (node === currentNode) return buf
      if (node.props?.type === 'array' && !node.contains(currentNode))
        return buf
      if (node.props?.type === 'void' && !hasNoVoidChildren(node)) return buf
      const currentPath = path.concat(node.props?.name || node.id)
      const arrayNode = findArrayParent(node)
      const label =
        node.props?.title ||
        node.props?.['x-component-props']?.title ||
        node.props?.name ||
        node.designerProps.title
      const value = arrayNode
        ? transformRelativePath(arrayNode, node)
        : currentPath.join('.')
      return buf.concat({
        label,
        value,
        node,
        children: transformChildren(node.children, currentPath),
      })
    }, [] as { label: string | undefined; value: any; node: any; children: any[] }[])
  }
  const root = findRoot(node)
  if (root) {
    return transformChildren(root.children)
  }
  return []
}

export const PathSelector = defineComponent({
  props: {
    value: {},
    onChange: {},
  },
  emits: ['change'],
  setup(props, { attrs, emit }) {
    const baseNode = useCurrentNode()
    const dataSource = transformDataSource(baseNode.value)
    return () => {
      return (
        <TreeSelect
          attrs={attrs}
          value={props.value}
          default-expand-all
          treeData={dataSource}
          onChange={(arg) => emit('change', arg)}
        />
      )
    }
  },
})
