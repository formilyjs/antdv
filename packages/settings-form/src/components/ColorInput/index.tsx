import { defineComponent, ref, onMounted } from 'vue-demi'
import { Input, Popover } from 'ant-design-vue'
import { Sketch as ColorPicker } from 'vue-color'
import { usePrefix } from '@formily/antdv-designable'
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
  },
  setup() {
    const prefixRef = usePrefix('color-input')
    const container = ref(null)

    return {
      prefixRef,
      container,
    }
  },
  render() {
    return (
      <div ref="container" class={this.prefixRef}>
        <Input
          value={this.$props.value}
          placeholder="Color"
          attrs={this.$attrs}
          scopedSlots={{
            prefix: () => (
              <Popover
                props={{
                  ...this.$props.popupProps,
                  trigger: 'click',
                  autoAdjustOverflow: true,
                  overlayInnerStyle: { padding: 0 },
                  getPopupContainer: () => this.container,
                }}
                scopedSlots={{
                  content: () => (
                    <ColorPicker
                      props={{
                        ...this.$props.colorPickerProps,
                        value: this.$props.value || {},
                      }}
                      onInput={({ hex, rgba }) => {
                        this.$emit(
                          'change',
                          this.$props.colorPickerProps?.disableAlpha
                            ? hex
                            : `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
                        )
                      }}
                    />
                  ),
                }}
              >
                <div
                  class={this.prefixRef + '-color-tips'}
                  style={{
                    backgroundColor: this.$props.value,
                  }}
                ></div>
              </Popover>
            ),
          }}
          onChange={(value) => {
            this.$emit('change', value)
          }}
        ></Input>
      </div>
    )
  },
})
