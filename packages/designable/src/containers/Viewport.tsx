import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  computed,
} from 'vue-demi'
import { requestIdle } from '@designable/shared'
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
    dragTipsDirection: String,
  },
  setup(props, { slots, attrs, refs }) {
    const loaded = ref(false)
    const prefixRef = usePrefix('viewport')
    const viewportHookRef = useViewport()

    const containerRef = computed<HTMLDivElement>(
      () => refs.container as HTMLDivElement
    )
    // 该组件内部缓存的ref
    const viewportRef = ref<ViewportType>()
    const isFrameRef = ref(false)

    onMounted(() => {
      const frameElement = containerRef.value?.querySelector('iframe')
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
        viewportHookRef.value.onMount(containerRef.value, window)
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
          ref="container"
          attrs={attrs}
          class={prefixRef.value}
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
