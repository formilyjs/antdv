import type { SpaceProps } from 'ant-design-vue'
import { defineComponent } from 'vue'
import { usePrefixCls } from '../__builtins__'
import { FormBaseItem } from '../form-item'
import { Space } from '../space'

export type FormButtonGroupProps = Omit<SpaceProps, 'align' | 'size'> & {
  align?: 'left' | 'right' | 'center'
  gutter?: number
  className?: string
  alignFormItem: boolean
}

export const FormButtonGroup = defineComponent({
  name: 'FormButtonGroup',
  props: {
    align: {
      type: String,
      default: 'left'
    },
    gutter: {
      type: Number,
      default: 8
    },
    alignFormItem: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots, attrs }) {
    const prefixCls = usePrefixCls('formily-form-button-group', attrs.prefixCls as string)

    return () => {
      if (props.alignFormItem) {
        return (
          <FormBaseItem
            style={{
              margin: 0,
              padding: 0,
              width: '100%'
            }}
            colon={false}
            label=" "
            {...attrs}
          >
            <Space size={props.gutter}>{slots.default?.()}</Space>
          </FormBaseItem>
        )
      } else {
        return (
          <Space
            class={prefixCls}
            style={{
              justifyContent:
                props.align === 'left'
                  ? 'flex-start'
                  : props.align === 'right'
                  ? 'flex-end'
                  : 'center',
              display: 'flex'
            }}
            {...attrs}
            size={props.gutter}
          >
            {slots.default?.()}
          </Space>
        )
      }
    }
  }
})

export default FormButtonGroup
