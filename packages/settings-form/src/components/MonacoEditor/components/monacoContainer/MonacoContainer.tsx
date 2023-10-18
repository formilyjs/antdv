import { computed, defineComponent, onMounted, ref } from 'vue'
import type { CSSProperties } from 'vue/types/jsx'
import Loading from '../loading'
import styles from './style'
import type { MonacoContainerProps } from './types'
import { monacoContainerProps } from './types'

export default defineComponent({
  props: monacoContainerProps,
  setup(props: MonacoContainerProps, { slots }) {
    const containerRef = ref(null)
    const wrapperStyle = computed<CSSProperties>(() => {
      const { width, height } = props
      return {
        ...styles.wrapper,
        width,
        height
      }
    })

    const containerStyle = computed<CSSProperties>(() => {
      return {
        ...styles.fullWidth,
        ...(!props.isEditorReady && styles.hide)
      }
    })
    onMounted(() => {
      props.setContainerRef(containerRef)
    })

    return () => {
      return (
        <div style={wrapperStyle.value}>
          {!props.isEditorReady && <Loading>{slots.default?.()}</Loading>}
          <div ref="containerRef" style={containerStyle.value} class={props.className} />
        </div>
      )
    }
  }
})
