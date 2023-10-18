import type { TreeNode } from '@pind/designable-core'
import type { Rect } from '@pind/designable-shared'
import { cancelIdle, requestIdle } from '@pind/designable-shared'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { useEffect } from '../shared/useEffect'
import { useViewport } from './useViewport'

const isEqualRect = (rect1: Partial<DOMRect>, rect2: Rect) => {
  return (
    rect1?.x === rect2?.x &&
    rect1?.y === rect2?.y &&
    rect1?.width === rect2?.width &&
    rect1?.height === rect2?.height
  )
}

export const useValidNodeOffsetRect = (node: Ref<TreeNode>) => {
  const viewportRef = useViewport()
  const rectRef = ref(viewportRef.value.getValidNodeOffsetRect(node.value))
  const idleTaskRef = ref(null)
  const unmountRef = ref(false)
  const observerRef = ref(null)
  const element = computed(() => viewportRef.value.findElementById(node.value?.id))

  const compute = () => {
    if (unmountRef.value) return
    const nextRect = viewportRef.value.getValidNodeOffsetRect(node.value)
    if (!isEqualRect(rectRef.value, nextRect) && nextRect) {
      rectRef.value = nextRect
      // rectRef.value = nextRect
      // forceUpdate(nextRect)
      // forceUp
    }
  }

  useEffect(
    () => {
      if (!element.value) return
      if (observerRef.value) {
        observerRef.value.disconnect()
      }
      observerRef.value = new ResizeObserver(() => {
        compute()
      })
      observerRef.value.observe(viewportRef.value.findElementById(node.value?.id))
      return () => observerRef.value?.disconnect()
    },
    () => [element.value, viewportRef.value]
  )

  useEffect(
    () => {
      unmountRef.value = false
      const requestIdleTask = () => {
        cancelIdle(idleTaskRef.value)
        idleTaskRef.value = requestIdle(() => {
          compute()
          requestIdleTask()
        })
      }
      requestIdleTask()
      return () => {
        unmountRef.value = true
        cancelIdle(idleTaskRef.value)
      }
    },
    () => [node]
  )

  return rectRef
}
