import { FragmentComponent as Fragment } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { defineComponent } from 'vue-demi'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { isNum } from '@designable/shared'
import {
  useSelection,
  useValidNodeOffsetRect,
  useTree,
  useCursor,
  useDragon,
  usePrefix,
} from '../../hooks'
import { Helpers } from './Helpers'
import type { TreeNode } from '@designable/core'
export interface ISelectionBoxProps {
  node: TreeNode
  showHelpers: boolean
}

export const SelectionBox = defineComponent({
  inheritAttrs: false,
  props: ['node', 'showHelpers'],
  setup(props) {
    const prefixRef = usePrefix('aux-selection-box')
    const nodeRectRef = useValidNodeOffsetRect(props.node)

    return () => {
      const nodeRect = nodeRectRef.value
      const createSelectionStyle = () => {
        const baseStyle: Record<string, any> = {
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          boxSizing: 'border-box',
        }
        if (nodeRect) {
          baseStyle.transform = `perspective(1px) translate3d(${nodeRect.x}px,${nodeRect.y}px,0)`
          baseStyle.height = isNum(nodeRect.height)
            ? nodeRect.height + 'px'
            : nodeRect.height
          baseStyle.width = isNum(nodeRect.width)
            ? nodeRect.width + 'px'
            : nodeRect.width
        }
        return baseStyle
      }
      if (!nodeRect) return null

      if (!nodeRect.width || !nodeRect.height) return null

      return (
        <div class={prefixRef.value} style={createSelectionStyle()}>
          {props.showHelpers && (
            <Helpers
              // key={JSON.stringify(nodeRect.toJSON())}
              // attrs={attrs}
              node={props.node}
              nodeRect={nodeRect}
            />
          )}
        </div>
      )
    }
  },
})

const SelectionComponent = observer(
  defineComponent({
    setup() {
      const selectionRef = useSelection()
      const treeRef = useTree()
      const cursorRef = useCursor()
      const viewportDragonRef = useDragon()
      return () => {
        if (
          cursorRef.value.status !== 'NORMAL' &&
          viewportDragonRef.value.touchNode
        )
          return null
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
    },
  })
)

export const Selection = composeExport(SelectionComponent, {
  displayName: 'Selection',
})
