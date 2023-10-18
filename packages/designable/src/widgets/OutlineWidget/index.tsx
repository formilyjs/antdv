// import React, { useRef, useLayoutEffect } from 'react'
import { observer } from '@formily/reactive-vue'
import type { Viewport } from '@pind/designable-core'
import { computed, defineComponent, onMounted, provide, ref, unref } from 'vue'
import { useOutline, usePrefix, useTree, useWorkbench } from '../../hooks'
import { useStyle } from '../../shared/util'
import { Insertion } from './Insertion'
import { OutlineTreeNode } from './OutlineNode'
import { NodeSymbol } from './context'

export const OutlineTreeWidget = observer(
  defineComponent({
    props: ['renderActions', 'renderTitle', 'onClose'],
    setup(props) {
      const refInstance = ref<HTMLDivElement>(null)
      const prefixRef = usePrefix('outline-tree')
      const workbenchRef = useWorkbench()
      const workspaceId = computed(() => {
        const current = workbenchRef.value?.activeWorkspace || workbenchRef.value?.currentWorkspace
        return current?.id
      })

      const treeRef = useTree(workspaceId)
      const outline = useOutline(workspaceId)
      const outlineRef = ref<Viewport>()
      const style = useStyle()

      provide(
        NodeSymbol,
        ref({
          renderActions: props.renderActions,
          renderTitle: props.renderTitle
        })
      )

      // [workspaceId, outline]
      // TODO::响应式有bug
      onMounted(() => {
        const _outline = outline.value
        if (!workspaceId.value) return
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
        if (!outline.value || !workspaceId.value) return null
        return (
          <div class={prefix + '-container'} style={style}>
            <div class={prefix + '-content'} ref={refInstance}>
              <OutlineTreeNode node={tree} workspaceId={workspaceId} />
              <div
                class={prefix + '-aux'}
                style={{
                  pointerEvents: 'none'
                }}
              >
                <Insertion workspaceId={workspaceId} />
              </div>
            </div>
          </div>
        )
      }
    }
  })
)
