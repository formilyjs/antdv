import type { Engine } from '@pind/designable-core'
import { CursorType, DragMoveEvent, DragStartEvent, DragStopEvent } from '@pind/designable-core'
import { calcSpeedFactor, createUniformSpeedAnimation, isStr } from '@pind/designable-shared'
import { observe } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import type { Ref } from 'vue'
import { defineComponent, nextTick, onBeforeUnmount, ref } from 'vue'
import { useDesigner, usePrefix, useScreen } from '../../hooks'
import { IconWidget } from '../../widgets'
import { ResizeHandle, ResizeHandleType } from './handle'
import './styles.less'

const useResizeEffect = (
  container: Ref<HTMLDivElement>, // React.MutableRefObject<HTMLDivElement>,
  content: Ref<HTMLDivElement>, // React.MutableRefObject<HTMLDivElement>,
  engine: Engine
) => {
  let status: ResizeHandleType = null
  let startX = 0
  let startY = 0
  let startWidth = 0
  let startHeight = 0
  let animationX = null
  let animationY = null

  const updateSize = (deltaX: number, deltaY: number) => {
    const containerRect = container.value?.getBoundingClientRect()
    if (status === ResizeHandleType.Resize) {
      engine.screen.setSize(startWidth + deltaX, startHeight + deltaY)
      container.value.scrollBy(containerRect.width + deltaX, containerRect.height + deltaY)
    } else if (status === ResizeHandleType.ResizeHeight) {
      engine.screen.setSize(startWidth, startHeight + deltaY)
      container.value.scrollBy(container.value.scrollLeft, containerRect.height + deltaY)
    } else if (status === ResizeHandleType.ResizeWidth) {
      engine.screen.setSize(startWidth + deltaX, startHeight)
      container.value.scrollBy(containerRect.width + deltaX, container.value.scrollTop)
    }
  }

  engine.subscribeTo(DragStartEvent, (e) => {
    if (!engine.workbench.currentWorkspace?.viewport) return
    const target = e.data.target as HTMLElement
    if (target?.closest('*[data-designer-resize-handle]')) {
      const rect = content.value?.getBoundingClientRect()
      if (!rect) return
      status = target.getAttribute('data-designer-resize-handle') as ResizeHandleType
      engine.cursor.setType(status)
      startX = e.data.topClientX
      startY = e.data.topClientY
      startWidth = rect.width
      startHeight = rect.height
    }
  })
  engine.subscribeTo(DragMoveEvent, (e) => {
    if (!engine.workbench.currentWorkspace?.viewport) return
    if (!status) return
    const deltaX = e.data.topClientX - startX
    const deltaY = e.data.topClientY - startY
    const containerRect = container.value?.getBoundingClientRect()
    const distanceX = Math.floor(containerRect.right - e.data.topClientX)
    const distanceY = Math.floor(containerRect.bottom - e.data.topClientY)
    const factorX = calcSpeedFactor(distanceX, 10)
    const factorY = calcSpeedFactor(distanceY, 10)
    updateSize(deltaX, deltaY)
    if (distanceX <= 10) {
      if (!animationX) {
        animationX = createUniformSpeedAnimation(1000 * factorX, (delta) => {
          updateSize(deltaX + delta, deltaY)
        })
      }
    } else {
      if (animationX) {
        animationX = animationX()
      }
    }

    if (distanceY <= 10) {
      if (!animationY) {
        animationY = createUniformSpeedAnimation(300 * factorY, (delta) => {
          updateSize(deltaX, deltaY + delta)
        })
      }
    } else {
      if (animationY) {
        animationY = animationY()
      }
    }
  })
  engine.subscribeTo(DragStopEvent, () => {
    if (!status) return
    status = null
    engine.cursor.setType(CursorType.Move)
    if (animationX) {
      animationX = animationX()
    }
    if (animationY) {
      animationY = animationY()
    }
  })
}

/**
 * @param content
 */
function useScreenModifier(screen, content: Ref<HTMLDivElement>) {
  const dispose = observe(screen, () => {
    nextTick(() => {
      screen.setSize(content.value?.clientWidth, content.value?.clientHeight)
    })
  })
  nextTick(() => {
    screen.setSize(content.value?.clientWidth, content.value?.clientHeight)
  })
  onBeforeUnmount(() => {
    dispose()
  })
}

const ResponsiveSimulatorComponent = defineComponent({
  name: 'DnResponsiveSimulator',
  props: [],
  setup(props, { attrs, slots }) {
    const content = ref<HTMLDivElement>()
    const container = ref<HTMLDivElement>()
    const prefixRef = usePrefix('responsive-simulator')
    const screenRef = useScreen()

    useDesigner((engine) => {
      useResizeEffect(container, content, engine)
    })

    useScreenModifier(screenRef.value, content)

    return () => {
      return (
        <div
          {...{
            attrs
          }}
          class={prefixRef.value}
          style={{
            height: '100%',
            width: '100%',
            minHeight: '100px',
            position: 'relative'
          }}
        >
          <div
            ref={container}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              overflow: 'overlay'
            }}
          >
            <div
              ref={content}
              style={{
                width: isStr(screenRef.value.width)
                  ? screenRef.value.width
                  : screenRef.value.width + 'px',
                height: isStr(screenRef.value.height)
                  ? screenRef.value.height
                  : screenRef.value.height + 'px',
                paddingRight: '15px',
                paddingBottom: '15px',
                position: 'relative',
                boxSizing: 'border-box',
                overflow: 'hidden'
              }}
            >
              {slots.default?.()}
              <ResizeHandle type={ResizeHandleType.Resize}>
                <IconWidget style={{ pointerEvents: 'none' }} infer="DragMove" />
              </ResizeHandle>
              <ResizeHandle type={ResizeHandleType.ResizeHeight}>
                <IconWidget style={{ pointerEvents: 'none' }} infer="Menu" />
              </ResizeHandle>
              <ResizeHandle type={ResizeHandleType.ResizeWidth}>
                <IconWidget style={{ pointerEvents: 'none' }} infer="Menu" />
              </ResizeHandle>
            </div>
          </div>
        </div>
      )
    }
  }
})
export const ResponsiveSimulator = observer(ResponsiveSimulatorComponent)
