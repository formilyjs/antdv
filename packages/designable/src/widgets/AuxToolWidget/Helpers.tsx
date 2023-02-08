import { computed, defineComponent, nextTick, ref, unref } from 'vue-demi'
import { Button } from 'ant-design-vue'
import { reaction } from '@formily/reactive'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { usePrefix, useViewport } from '../../hooks'
import { useEffect } from '../../shared/useEffect'
import { Selector } from './Selector'
import { Copy } from './Copy'
import { Delete } from './Delete'
import { DragHandler } from './DragHandler'

import type { TreeNode } from '@designable/core'

const HELPER_DEBOUNCE_TIMEOUT = 100

export interface IHelpersProps {
  node: TreeNode
  nodeRect: DOMRect
}

export interface IViewportState {
  viewportWidth?: number
  viewportHeight?: number
  viewportScrollX?: number
  viewportScrollY?: number
  viewportIsScrollTop?: boolean
  viewportIsScrollBottom?: boolean
}

const HelpersComponent = defineComponent({
  props: ['node', 'nodeRect'],
  setup(props, { refs }) {
    const prefixRef = usePrefix('aux-helpers')
    const viewportRef = useViewport()
    const unmountRef = ref(false)
    const refContainer = computed<HTMLDivElement>(
      () => refs.ref as HTMLDivElement
    )
    const positionRef = ref('top-right')

    useEffect(
      () => {
        let request = null
        const getYInViewport = (nodeRect: DOMRect, helpersRect: DOMRect) => {
          if (nodeRect.top - viewportRef.value.scrollY > helpersRect.height) {
            return 'top'
          } else if (
            viewportRef.value.isScrollTop &&
            nodeRect.height + helpersRect.height > viewportRef.value.height
          ) {
            return 'inner-top'
          } else if (
            viewportRef.value.isScrollBottom &&
            nodeRect.height + helpersRect.height > viewportRef.value.height
          ) {
            return 'inner-bottom'
          }

          return 'bottom'
        }

        const getXInViewport = (nodeRect: DOMRect, helpersRect: DOMRect) => {
          const widthDelta = helpersRect.width - nodeRect.width
          if (widthDelta >= 0) {
            if (nodeRect.x < widthDelta) {
              return 'left'
            } else if (nodeRect.right + widthDelta > viewportRef.value.width) {
              return 'right'
            } else {
              return 'center'
            }
          }
          return 'right'
        }

        const update = () => {
          const nodeRect = props.nodeRect
          const ref = refContainer
          const helpersRect = ref.value?.getBoundingClientRect()
          if (!helpersRect || !nodeRect) return
          if (unmountRef.value) return
          positionRef.value =
            getYInViewport(nodeRect, helpersRect) +
            '-' +
            getXInViewport(nodeRect, helpersRect)
        }

        nextTick(() => {
          update()
        })

        return reaction(
          () => [
            viewportRef.value.width,
            viewportRef.value.height,
            viewportRef.value.scrollX,
            viewportRef.value.scrollY,
            viewportRef.value.isScrollBottom,
            viewportRef.value.isScrollTop,
          ],
          () => {
            clearTimeout(request)
            request = setTimeout(update, HELPER_DEBOUNCE_TIMEOUT)
          }
        )
      },
      () => [viewportRef.value, props.nodeRect]
    )

    return () => {
      const node = props.node
      const nodeRect = props.nodeRect
      if (!nodeRect || !node) return null

      return (
        <div
          class={[
            prefixRef.value,
            {
              [positionRef.value]: true,
            },
          ]}
          ref="ref"
        >
          <div class={prefixRef.value + '-content'}>
            <Selector node={node} />
            <Button.Group style={{ display: 'flex' }}>
              {node?.allowClone() === false ? null : <Copy node={node} />}
              {node?.allowDrag() === false ? null : <DragHandler node={node} />}
              {node?.allowDelete() === false ? null : <Delete node={node} />}
            </Button.Group>
          </div>
        </div>
      )
    }
  },
})

export const Helpers = composeExport(HelpersComponent, {
  displayName: 'Helpers',
})
