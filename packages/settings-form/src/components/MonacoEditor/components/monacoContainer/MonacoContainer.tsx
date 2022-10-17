import { defineComponent, computed } from 'vue-demi'
import Loading from '../loading'
import { monacoContainerProps } from './types'
import styles from './style'

import type { MonacoContainerProps } from './types'

export default defineComponent({
  props: monacoContainerProps,
  setup(props: MonacoContainerProps, { slots }) {
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

    return () => (
      <div style={wrapperStyle.value}>
        {!props.isEditorReady && <Loading>{slots.default?.()}</Loading>}
        <div
          ref={props.setContainerRef as any}
          style={containerStyle.value}
          class={props.className}
        />
      </div>
    )
  },
})
