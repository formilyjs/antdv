import { defineComponent, provide, ref, toRef } from 'vue-demi'
import { GlobalRegistry } from '@designable/core'
import { FragmentComponent as Fragment } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { useTree, usePrefix, useDesigner, useComponents } from '../../hooks'
import { TreeNodeSymbol, DesignerComponentsSymbol } from '../../context'
import './styles.less'

import type { PropType } from 'vue-demi'
import type { TreeNode } from '@designable/core'
import type { IDesignerComponents } from '../../types'

export interface IComponentTreeWidgetProps {
  components: IDesignerComponents
}

export interface ITreeNodeWidgetProps {
  node: TreeNode
}

export const TreeNodeWidgetComponent = defineComponent({
  name: 'DnTreeNodeWidget',
  props: {
    node: Object as PropType<TreeNode>,
  },
  setup(props) {
    const designerRef = useDesigner(props.node?.designerProps?.effects)
    const componentsRef = useComponents()

    provide(TreeNodeSymbol, toRef(props, 'node'))

    return () => {
      const node = props.node
      const renderChildren = () => {
        if (node?.designerProps?.selfRenderChildren) return []
        return node?.children?.map((child) => {
          return <TreeNodeWidget key={child.id} node={child} />
        })
      }

      // may need to change
      const renderProps = (extendsProps: any = {}) => {
        return {
          ...node.designerProps?.defaultProps,
          ...extendsProps,
          ...node.props,
          ...node.designerProps?.getComponentProps?.(node),
        }
      }

      const renderComponent = () => {
        const componentName = node.componentName
        const Component = componentsRef.value?.[componentName]

        const dataId = {}
        if (Component) {
          if (designerRef.value) {
            dataId[designerRef.value?.props?.nodeIdAttrName] = node.id
          }
          const { style, ...attrs } = renderProps(dataId)
          return (
            <Component attrs={attrs} key={node.id} style={style}>
              {renderChildren()}
            </Component>
          )
        } else {
          if (node?.children?.length) {
            return <Fragment>{renderChildren()}</Fragment>
          }
        }
      }
      if (!node) return null
      if (node.hidden) return null
      return renderComponent()
    }
  },
})

export const TreeNodeWidget = observer(TreeNodeWidgetComponent)

export const ComponentTreeWidgetComponent = observer(
  defineComponent({
    name: 'DnComponentTreeWidget',
    props: { components: [Object] },
    setup(props) {
      const treeRef = useTree()
      const prefixRef = usePrefix('component-tree')
      const designerRef = useDesigner()
      const dataId = {}

      GlobalRegistry.registerDesignerBehaviors(
        props.components as IDesignerComponents
      )
      provide(DesignerComponentsSymbol, ref(toRef(props, 'components')))
      if (designerRef.value && treeRef.value) {
        dataId[designerRef.value?.props?.nodeIdAttrName] = treeRef.value.id
      }
      return () => {
        return (
          <div class={prefixRef.value} attrs={{ ...dataId }}>
            <TreeNodeWidget node={treeRef.value} />
          </div>
        )
      }
    },
  })
)

export const ComponentTreeWidget = composeExport(ComponentTreeWidgetComponent, {
  displayName: 'ComponentTreeWidget',
})
