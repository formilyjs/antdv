import { defineComponent } from 'vue'
import { usePrefix } from '../../hooks'

export enum ResizeHandleType {
  Resize = 'RESIZE',
  ResizeWidth = 'RESIZE_WIDTH',
  ResizeHeight = 'RESIZE_HEIGHT'
}

export interface IResizeHandleProps {
  type?: ResizeHandleType
}

export const ResizeHandle = defineComponent({
  props: ['type'],
  setup(props, { slots, attrs }) {
    const prefixRef = usePrefix('resize-handle')
    return () => {
      return (
        <div
          {...{
            attrs
          }}
          data-designer-resize-handle={props.type}
          class={[
            prefixRef.value,
            {
              [`${prefixRef.value}-${props.type}`]: !!props.type
            }
          ]}
        >
          {slots.default?.()}
        </div>
      )
    }
  }
})
