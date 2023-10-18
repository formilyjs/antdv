import { observer } from '@formily/reactive-vue'
import { FragmentComponent as Fragment } from '@formily/vue'
import type { TreeNode } from '@pind/designable-core'
import { isNum } from '@pind/designable-shared'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { defineComponent, toRef } from 'vue'
import {
  useCursor,
  useDesigner,
  useMoveHelper,
  usePrefix,
  useSelection,
  useTree,
  useValidNodeOffsetRect
} from '../../hooks'
import { Helpers } from './Helpers'
import { ResizeHandler } from './ResizeHandler'
import { TranslateHandler } from './TranslateHandler'

export interface ISelectionBoxProps {
  node: TreeNode
  showHelpers: boolean
}

export const SelectionBox = defineComponent({
  name: 'DnSelectionBox',
  inheritAttrs: false,
  props: ['node', 'showHelpers'],
  setup(props, { attrs }) {
    const designerRef = useDesigner()
    const prefixRef = usePrefix('aux-selection-box')
    const innerPrefixRef = usePrefix('aux-selection-box-inner')
    const node = toRef(props, 'node')

    const nodeRectRef = useValidNodeOffsetRect(node)

    return () => {
      const nodeRect = nodeRectRef.value
      const createSelectionStyle = () => {
        const baseStyle: Record<string, any> = {
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          boxSizing: 'border-box'
        }
        if (nodeRect) {
          baseStyle.transform = `perspective(1px) translate3d(${nodeRect.x}px,${nodeRect.y}px,0)`
          baseStyle.height = isNum(nodeRect.height) ? nodeRect.height + 'px' : nodeRect.height
          baseStyle.width = isNum(nodeRect.width) ? nodeRect.width + 'px' : nodeRect.width
        }
        return baseStyle
      }
      if (!nodeRect) return null
      if (!nodeRect.width || !nodeRect.height) return null

      const selectionId = {
        [designerRef.value.props.nodeSelectionIdAttrName!]: props.node.id
      }
      return (
        <div {...selectionId} class={prefixRef.value} style={createSelectionStyle()}>
          <div class={innerPrefixRef.value}></div>
          <ResizeHandler node={props.node} />
          <TranslateHandler node={props.node} />
          {props.showHelpers && <Helpers {...attrs} node={props.node} nodeRect={nodeRect} />}
        </div>
      )
    }
  }
})

const SelectionComponent = observer(
  defineComponent({
    name: 'DnSelection',
    setup() {
      const selectionRef = useSelection()
      const treeRef = useTree()
      const cursorRef = useCursor()
      const viewportDragonRef = useMoveHelper()
      return () => {
        if (cursorRef.value.status !== 'NORMAL' && viewportDragonRef.value.touchNode) return null
        return (
          <Fragment>
            {selectionRef.value.selected.map((id) => {
              const node = treeRef.value.findById(id)
              if (!node) return
              if (node.hidden) return
              return (
                <SelectionBox
                  key={id}
                  node={node}
                  showHelpers={selectionRef.value.selected.length === 1}
                />
              )
            })}
          </Fragment>
        )
      }
    }
  })
)

export const Selection = composeExport(SelectionComponent, {
  displayName: 'Selection'
})
