import { requestIdle } from '@designable/shared'
import cls from 'classnames'
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  computed,
} from 'vue-demi'
import { AuxToolWidget, EmptyWidget } from '../widgets'
import { usePrefix, useViewport } from '../hooks'
import { useStyle } from '../shared/util'
import type { VNode } from 'vue-demi'
import type { Viewport as ViewportType } from '@designable/core'

export interface IViewportProps {
  placeholder: VNode
  dragTipsDirection?: 'left' | 'right'
}

export const Viewport = defineComponent({
  name: 'DnViewport',
  props: {
    placeholder: {},
    dragTipsDirection: {},
  },
  setup(props: IViewportProps, { slots, attrs, refs }) {
    const loaded = ref(false)
    const prefixRef = usePrefix('viewport')
    const viewportHookRef = useViewport()

    const refInstance = computed<HTMLDivElement>(
      () => refs.viewportref as HTMLDivElement
    )
    // 该组件内部缓存的ref
    const viewportRef = ref<ViewportType>()
    const isFrameRef = ref(false)

    onMounted(() => {
      const ref = refInstance
      const frameElement = ref.value?.querySelector('iframe')
      if (!viewportHookRef.value) return
      if (viewportRef.value && viewportRef.value !== viewportHookRef.value) {
        viewportRef.value.onUnmount()
      }
      if (frameElement) {
        frameElement.addEventListener('load', () => {
          viewportHookRef.value.onMount(
            frameElement,
            frameElement.contentWindow
          )
          requestIdle(() => {
            isFrameRef.value = true
            loaded.value = true
          })
        })
      } else {
        viewportHookRef.value.onMount(ref.value, window)
        requestIdle(() => {
          isFrameRef.value = false
          loaded.value = true
        })
      }
      viewportRef.value = viewportHookRef.value
    })

    onBeforeUnmount(() => {
      viewportHookRef.value.onUnmount()
    })

    const style = useStyle()

    return () => {
      return (
        <div
          attrs={attrs}
          ref="viewportref"
          class={cls(prefixRef.value)}
          style={{
            opacity: !loaded ? 0 : 1,
            overflow: isFrameRef.value ? 'hidden' : 'overlay',
            ...style,
          }}
        >
          {slots.default?.()}
          <AuxToolWidget />
          <EmptyWidget dragTipsDirection={props.dragTipsDirection}>
            {props.placeholder}
          </EmptyWidget>
        </div>
      )
    }
  },
})
