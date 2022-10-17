/* eslint-disable */
// TODO:: 还有问题
import { TreeNode } from '@designable/core'
import { requestIdle, cancelIdle } from '@designable/shared'
import { ResizeObserver } from '@juggle/resize-observer'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  UnwrapRef,
} from 'vue-demi'
import { useEffect } from './useEffect'
import { useViewport } from './useViewport'

const isEqualRect = (rect1: Partial<DOMRect>, rect2: DOMRect) => {
  return (
    rect1?.x === rect2?.x &&
    rect1?.y === rect2?.y &&
    rect1?.width === rect2?.width &&
    rect1?.height === rect2?.height
  )
}

export const useValidNodeOffsetRect = (node: TreeNode) => {
  const viewportRef = useViewport()
  // const [, forceUpdate] = useState(null)
  const rectRef = ref<DOMRect>(viewportRef.value.getValidNodeOffsetRect(node))
  const idleTaskRef = ref(null)
  const unmountRef = ref(false)
  const observerRef = ref(null)
  const element = viewportRef.value.findElementById(node?.id)

  const compute = () => {
    if (unmountRef.value) return
    const nextRect = viewportRef.value.getValidNodeOffsetRect(node)
    if (!isEqualRect(rectRef.value, nextRect) && nextRect) {
      rectRef.value = nextRect
      // rectRef.value = nextRect
      // forceUpdate(nextRect)
      // forceUp
    }
  }

  useEffect(
    () => {
      if (!element) return
      if (observerRef.value) {
        observerRef.value.disconnect()
      }
      observerRef.value = new ResizeObserver(() => {
        compute()
      })
      observerRef.value.observe(element)
      return () => observerRef.value?.disconnect()
    },
    () => [element, viewportRef.value]
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
