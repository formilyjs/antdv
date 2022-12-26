import { defineComponent, computed, ref, onMounted } from 'vue-demi'
import Loading from '../loading'
import { monacoContainerProps } from './types'
import styles from './style'

import type { MonacoContainerProps } from './types'

export default defineComponent({
  props: monacoContainerProps,
  setup(props: MonacoContainerProps) {
    const containerRef = ref(null)
    const wrapperStyle = computed(() => {
      const { width, height } = props
      return {
        ...styles.wrapper,
        width,
        height,
      }
    })

    const containerStyle = computed(() => {
      return {
        ...styles.fullWidth,
        ...(!props.isEditorReady && styles.hide),
      }
    })
    onMounted(() => {
      props.setContainerRef(containerRef)
    })

    return {
      containerRef,
      wrapperStyle,
      containerStyle,
    }
  },
  render() {
    const {
      wrapperStyle,
      $scopedSlots: slots,
      containerStyle,
      $props: props,
    } = this
    return (
      <div style={wrapperStyle}>
        {!props.isEditorReady && <Loading>{slots.default?.()}</Loading>}
        <div
          ref="containerRef"
          style={containerStyle}
          class={props.className}
        />
      </div>
    )
  },
})
