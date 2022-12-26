import { Input, Popover } from 'ant-design-vue'
import { usePrefix } from '@formily/antdv-designable'
import { ref } from 'vue-demi'
import './styles.less'
import { defineComponent } from 'vue-demi'
// import ColorPicker from '../ColorPicker'
import { Chrome as ChromePicker } from 'vue-color'

export interface IColorInputProps {
  value?: string
  onChange?: (color: string) => void
}

export const ColorInput = defineComponent({
  props: ['value', 'onChange'],
  emits: ['change'],
  setup() {
    const prefixRef = usePrefix('color-input')
    const container = ref(null)
    return {
      prefixRef,
      container,
    }
  },
  render() {
    const { prefixRef, container } = this
    return (
      <div ref="container" class={prefixRef}>
        <Input
          value={this.value}
          vOn:input={(e) => {
            this.$emit('change', e.target.value)
          }}
          placeholder="Color"
          scopedSlots={{
            prefix: () => (
              <Popover
                trigger="click"
                autoAdjustOverflow
                overlayInnerStyle={{ padding: 0 }}
                getPopupContainer={() => container}
                scopedSlots={{
                  content: () => (
                    <ChromePicker
                      value={{ hex: this.$props.value }}
                      onInput={({ hex }) => {
                        this.$emit('change', hex)
                      }}
                    />
                  ),
                }}
              >
                <div
                  class={prefixRef + '-color-tips'}
                  style={{
                    backgroundColor: this.$props.value,
                  }}
                ></div>
              </Popover>
            ),
          }}
        ></Input>
      </div>
    )
  },
})
