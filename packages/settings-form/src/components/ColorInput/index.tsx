import { Sketch as ColorPicker } from '@ckpack/vue-color'
import { usePrefix } from '@formily/antdv-designable'
import { Input, Popover } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import './styles.less'

export interface IColorInputProps {
  value?: string
  popupProps?: Record<string, any>
  colorPickerProps?: Record<string, any>
}

export const ColorInput = defineComponent({
  emits: ['change'],
  props: {
    value: String,
    popupProps: Object,
    colorPickerProps: Object,
    onChange: Function
  },
  setup(props, { attrs, emit }) {
    const prefixRef = usePrefix('color-input')
    const containerRef = ref<HTMLDivElement>()

    return () => (
      <div ref={containerRef} class={prefixRef.value}>
        <Input
          value={props.value}
          placeholder="Color"
          {...attrs}
          onChange={(e) => {
            emit('change', e.target.value)
          }}
        >
          {{
            prefix: () => (
              <Popover
                {...{
                  ...props.popupProps,
                  trigger: 'click',
                  autoAdjustOverflow: true,
                  overlayInnerStyle: { padding: 0 },
                  getPopupContainer: () => containerRef.value
                }}
              >
                {{
                  content: () => (
                    <ColorPicker
                      {...props.colorPickerProps}
                      modelValue={props.value || ''}
                      onUpdate:modelValue={({ hex, rgba }) => {
                        emit(
                          'change',
                          props.colorPickerProps?.disableAlpha
                            ? hex
                            : `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
                        )
                      }}
                    />
                  ),
                  default: () => (
                    <div
                      class={prefixRef.value + '-color-tips'}
                      style={{
                        backgroundColor: props.value
                      }}
                    ></div>
                  )
                }}
              </Popover>
            )
          }}
        </Input>
      </div>
    )
  }
})
