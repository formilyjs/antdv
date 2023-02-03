// import React, { useRef, useLayoutEffect } from 'react'
import cls from 'classnames'
import { observer } from '@formily/reactive-vue'
import { defineComponent, onMounted, provide, ref, unref } from 'vue-demi'
import { useTree, usePrefix, useOutline, useWorkbench } from '../../hooks'
import { useStyle } from '../../shared/util'
import { OutlineTreeNode } from './OutlineNode'
import { Insertion } from './Insertion'
import { NodeSymbol } from './context'
import type { Viewport } from '@designable/core'

// export interface IOutlineTreeWidgetProps {
//   className?: string
//   style?: React.CSSProperties
//   onClose?: () => void
//   renderTitle?: (node: TreeNode) => React.ReactNode
//   renderActions?: (node: TreeNode) => React.ReactNode
// }

// export const OutlineTreeWidget = observer(
//   ({ onClose, style, renderActions, renderTitle, className, ...props }) => {
//     const ref = useRef<HTMLDivElement>()
//     const prefix = usePrefix('outline-tree')
//     const workbench = useWorkbench()
//     const current = workbench?.activeWorkspace || workbench?.currentWorkspace
//     const workspaceId = current?.id
//     const tree = useTree(workspaceId)
//     const outline = useOutline(workspaceId)
//     const outlineRef = useRef<Viewport>()
//     useLayoutEffect(() => {
//       if (!workspaceId) return
//       if (outlineRef.current && outlineRef.current !== outline) {
//         outlineRef.current.onUnmount()
//       }
//       if (ref.current && outline) {
//         outline.onMount(ref.current, window)
//       }
//       outlineRef.current = outline
//       return () => {
//         outline.onUnmount()
//       }
//     }, [workspaceId, outline])

//     if (!outline || !workspaceId) return null
//     return (
//       <NodeContext.Provider value={{ renderActions, renderTitle }}>
//         <div
//           {...props}
//           className={cls(prefix + '-container', className)}
//           style={style}
//         >
//           <div className={prefix + '-content'} ref={ref}>
//             <OutlineTreeNode node={tree} workspaceId={workspaceId} />
//             <div
//               className={prefix + '-aux'}
//               style={{
//                 pointerEvents: 'none',
//               }}
//             >
//               <Insertion workspaceId={workspaceId} />
//             </div>
//           </div>
//         </div>
//       </NodeContext.Provider>
//     )
//   }
// )

export const OutlineTreeWidget = observer(
  defineComponent({
    props: ['renderActions', 'renderTitle', 'onClose'],
    setup(props, { refs }) {
      // { onClose, style, renderActions, renderTitle, className,
      const refInstance = ref<HTMLDivElement>(null)
      const prefixRef = usePrefix('outline-tree')
      const workbenchRef = useWorkbench()
      const current =
        workbenchRef.value?.activeWorkspace ||
        workbenchRef.value?.currentWorkspace
      const workspaceId = current?.id
      const treeRef = useTree(workspaceId)
      const outline = useOutline(workspaceId)
      const outlineRef = ref<Viewport>()
      const style = useStyle()

      provide(
        NodeSymbol,
        ref({
          renderActions: props.renderActions,
          renderTitle: props.renderTitle,
        })
      )

      // [workspaceId, outline]
      // TODO::响应式有bug
      onMounted(() => {
        const _outline = outline.value
        refInstance.value = refs.ref as HTMLDivElement
        if (!workspaceId) return
        if (outlineRef.value && outlineRef.value !== _outline) {
          outlineRef.value.onUnmount()
        }
        if (refInstance.value && outline) {
          _outline.onMount(refInstance.value, window)
        }
        outlineRef.value = _outline
        return () => {
          _outline.onUnmount()
        }
      })

      return () => {
        const prefix = unref(prefixRef)
        const tree = unref(treeRef)
        if (!outline || !workspaceId) return null
        return (
          <div class={cls(prefix + '-container')} style={style}>
            <div class={prefix + '-content'} ref="ref">
              <OutlineTreeNode node={tree} workspaceId={workspaceId} />
              <div
                class={prefix + '-aux'}
                style={{
                  pointerEvents: 'none',
                }}
              >
                <Insertion workspaceId={workspaceId} />
              </div>
            </div>
          </div>
        )
      }
    },
  })
)
