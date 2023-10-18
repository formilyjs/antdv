// import React, { useEffect, useRef } from 'react'
import { CursorStatus, CursorType } from '@pind/designable-core'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { defineComponent, onBeforeUnmount, ref } from 'vue'
import { useCursor, useDesigner, useOperation, usePrefix, useViewport } from '../../hooks'
import { ResizeHandleType } from '../../simulators/ResponsiveSimulator/handle'
import { Cover } from './Cover'
import { DashedBox } from './DashedBox'
import { FreeSelection } from './FreeSelection'
import { Insertion } from './Insertion'
import { Selection } from './Selection'
import './styles.less'

const setCursorState = (contentWindow: Window, state: string) => {
  const valueRoot = document?.getElementsByTagName?.('html')?.[0]
  const root = contentWindow?.document?.getElementsByTagName('html')?.[0]
  if (root) {
    root.style.cursor = state
  }
  if (valueRoot) {
    valueRoot.style.cursor = state
  }
}

const AuxToolWidgetComponent = defineComponent({
  name: 'DnAuxToolWidget',
  props: [],
  setup() {
    const engineRef = useDesigner()
    const viewportRef = useViewport()
    const operationRef = useOperation()
    const cursorRef = useCursor()
    const prefixRef = usePrefix('aux-tool')
    const _ref = ref<HTMLDivElement>()

    const engineSubs: any[] = []

    // [engine, viewport]
    const cb1 = engineRef.value.subscribeWith('viewport:scroll', () => {
      if (viewportRef.value.isIframe && _ref.value) {
        _ref.value.style.transform = `perspective(1px) translate3d(${-viewportRef.value
          .scrollX}px,${-viewportRef.value.scrollY}px,0)`
      }
    })
    // [engine, cursor, viewportDragon, viewport, operation]
    const cb2 = engineRef.value.subscribeWith(['drag:move', 'drag:stop'], () => {
      if (cursorRef.value.status !== CursorStatus.Dragging) {
        setCursorState(viewportRef.value.contentWindow, 'default')
      } else {
        if (cursorRef.value.type === CursorType.Move) {
          if (operationRef.value.getDragNodes().length) {
            // todo: update cursor will trigger document layout rerender https://bugs.chromium.org/p/chromium/issues/detail?id=664066
            // if (viewportDragon.closestDirection === ClosestPosition.Inner) {
            //   setCursorState(viewport.contentWindow, 'copy')
            // } else {
            setCursorState(viewportRef.value.contentWindow, 'move')
            //}
          }
        } else {
          if (cursorRef.value.type === ResizeHandleType.ResizeWidth) {
            setCursorState(viewportRef.value.contentWindow, 'ew-resize')
          } else if (cursorRef.value.type === ResizeHandleType.ResizeHeight) {
            setCursorState(viewportRef.value.contentWindow, 'ns-resize')
          } else if (cursorRef.value.type === ResizeHandleType.Resize) {
            setCursorState(viewportRef.value.contentWindow, 'nwse-resize')
          } else {
            setCursorState(viewportRef.value.contentWindow, 'default')
          }
        }
      }
    })
    engineSubs.push(cb1, cb2)

    onBeforeUnmount(() => {
      engineSubs.map((engineCb) => engineCb())
    })

    return () => {
      if (!viewportRef.value) return null

      return (
        <div ref={_ref} class={prefixRef.value}>
          <Insertion />
          <DashedBox />
          <Selection />
          <Cover />
          <FreeSelection />
        </div>
      )
    }
  }
})

export const AuxToolWidget = composeExport(AuxToolWidgetComponent, {
  displayName: 'AuxToolWidget'
})
