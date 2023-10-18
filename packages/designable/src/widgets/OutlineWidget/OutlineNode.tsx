import { autorun } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import type { TreeNode } from '@pind/designable-core'
import { ClosestPosition, CursorStatus, DragMoveEvent } from '@pind/designable-core'
import { isFn } from '@pind/designable-shared'
import { defineComponent, onBeforeUnmount, onMounted, ref, toRef } from 'vue'
import { useContext } from '../../context'
import { useCursor, useDesigner, useMoveHelper, usePrefix, useSelection } from '../../hooks'
import { useStyle } from '../../shared/util'
import { IconWidget } from '../IconWidget'
import { NodeTitleWidget } from '../NodeTitleWidget'
import { NodeSymbol } from './context'
import './styles.less'

export interface IOutlineTreeNodeProps {
  node: TreeNode
  workspaceId?: string
}

export const OutlineTreeNode = observer(
  defineComponent({
    name: 'DnOutlineTreeNode',
    props: ['workspaceId', 'node'],
    setup(props) {
      const style = useStyle()

      const prefix = usePrefix('outline-tree-node')
      const engine = useDesigner()
      const refInstance = ref<HTMLDivElement>()
      const ctx = useContext(NodeSymbol)
      const request = ref(null)
      const cursor = useCursor()
      const workspaceId = toRef(props, 'workspaceId')

      const selection = useSelection(workspaceId)
      const moveHelper = useMoveHelper(workspaceId)

      // [node, outlineDragon, cursor]
      const unSub = []
      onMounted(() => {
        const ref = refInstance
        const subCb = engine.value.subscribeTo(DragMoveEvent, () => {
          const closestNodeId = moveHelper.value?.closestNode?.id
          const closestDirection = moveHelper.value?.outlineClosestDirection
          const id = props.node.id
          if (!ref.value) return
          if (closestNodeId === id && closestDirection === ClosestPosition.Inner) {
            if (!ref.value.classList.contains('droppable')) {
              ref.value.classList.add('droppable')
            }
            if (!ref.value.classList.contains('expanded')) {
              if (request.value) {
                clearTimeout(request.value)
                request.value = null
              }
              request.value = setTimeout(() => {
                ref.value.classList.add('expanded')
              }, 600)
            }
          } else {
            if (request.value) {
              clearTimeout(request.value)
              request.value = null
            }
            if (ref.value.classList.contains('droppable')) {
              ref.value.classList.remove('droppable')
            }
          }
        })
        unSub.push(subCb)
        //[node, selection]
        const subCb2 = autorun(() => {
          const selectedIds = selection.value?.selected || []
          const id = props.node.id
          if (!ref.value) return
          if (selectedIds.includes(id)) {
            if (!ref.value.classList.contains('selected')) {
              ref.value.classList.add('selected')
            }
          } else {
            if (ref.value.classList.contains('selected')) {
              ref.value.classList.remove('selected')
            }
          }
          if (cursor.value.status === CursorStatus.Dragging) {
            if (ref.value.classList.contains('selected')) {
              ref.value.classList.remove('selected')
            }
          }
        })
        unSub.push(subCb2)
      })

      onBeforeUnmount(() => {
        unSub.forEach((cb) => cb())
      })

      return () => {
        const ref = refInstance
        const node = props.node

        if (!node) return null
        const renderIcon = (node: TreeNode) => {
          const icon = node.designerProps.icon
          if (icon) {
            return <IconWidget infer={icon} size={'12px'} />
          }
          if (node === node?.root) {
            return <IconWidget infer="Page" size={'12px'} />
          } else if (node.designerProps?.droppable) {
            return <IconWidget infer="Container" size={'12px'} />
          }
          return <IconWidget infer="Component" size={'12px'} />
        }

        const renderTitle = (node: TreeNode) => {
          if (isFn(ctx.value.renderTitle)) return ctx.value.renderTitle(node)
          return (
            <span>
              <NodeTitleWidget node={node} />
            </span>
          )
        }
        const renderActions = (node: TreeNode) => {
          if (isFn(ctx.value.renderActions)) return ctx.value.renderActions(node)
        }
        return (
          <div
            style={style}
            ref="ref"
            class={[prefix.value, 'expanded']}
            data-designer-outline-node-id={node.id}
          >
            <div class={prefix.value + '-header'}>
              <div
                class={prefix.value + '-header-head'}
                style={{
                  left: -node.depth * 16 + 'px',
                  width: node.depth * 16 + 'px'
                }}
              ></div>
              <div class={prefix.value + '-header-content'}>
                <div class={prefix.value + '-header-base'}>
                  {(node?.children?.length > 0 || node === node.root) && (
                    <div
                      class={prefix.value + '-expand'}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (ref.value?.classList?.contains('expanded')) {
                          ref.value?.classList.remove('expanded')
                        } else {
                          ref.value?.classList.add('expanded')
                        }
                      }}
                    >
                      <IconWidget infer="Expand" size={10} />
                    </div>
                  )}
                  <div class={prefix.value + '-icon'}>{renderIcon(node)}</div>
                  <div class={prefix.value + '-title'}>{renderTitle(node)}</div>
                </div>
                <div class={prefix.value + '-header-actions'} data-click-stop-propagation>
                  {renderActions(node)}
                  {node !== node.root && (
                    <IconWidget
                      key={node.hidden ? 'EyeClose' : 'Eye'}
                      class={[
                        prefix.value + '-hidden-icon',
                        {
                          hidden: node.hidden
                        }
                      ]}
                      infer={node.hidden ? 'EyeClose' : 'Eye'}
                      size={14}
                      onClick={() => {
                        node.hidden = !node.hidden
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div class={prefix.value + '-children'}>
              {node.children?.map((child) => {
                return (
                  <OutlineTreeNode key={child.id} node={child} workspaceId={props.workspaceId} />
                )
              })}
            </div>
          </div>
        )
      }
    }
  })
)
