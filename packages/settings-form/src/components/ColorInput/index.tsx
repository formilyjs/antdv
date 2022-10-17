import { Input, ColorPicker } from 'ant-design-vue'
import { usePrefix } from '@formily/antdv-designable'
import './styles.less'
import { defineComponent } from 'vue-demi'

export interface IColorInputProps {
  value?: string
  onChange?: (color: string) => void
}

export const ColorInput = defineComponent({
  props: ['value'],
  setup(props, { emit }) {
    const prefixRef = usePrefix('color-input')
    return () => {
      // const color = props.value as string
      return (
        <div class={prefixRef.value}>
          <Input
            value={props.value}
            vOn:input={(e) => {
              emit('change', e)
            }}
            placeholder="Color"
          >
            <ColorPicker
              slot="prefix"
              size={'mini'}
              value={props.value}
              vOn:input={(color) => {
                emit('change', color)
              }}
            ></ColorPicker>
          </Input>
        </div>
      )
    }
  },
})
