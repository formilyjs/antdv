import { defineComponent } from 'vue-demi'
import { h } from '@formily/vue'
import { usePrefixCls } from '../__builtins__'
import { Space } from '../space'
import { FormBaseItem } from '../form-item'

import type { Space as SpaceProps } from 'ant-design-vue/types/space'

export type FormButtonGroupProps = Omit<SpaceProps, 'align' | 'size'> & {
  align?: 'left' | 'right' | 'center'
  gutter?: number
  className?: string
  alignFormItem: boolean
}

export const FormButtonGroup = defineComponent<FormButtonGroupProps>({
  name: 'FormButtonGroup',
  props: {
    align: {
      type: String,
      default: 'left',
    },
    gutter: {
      type: Number,
      default: 8,
    },
    alignFormItem: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    const prefixCls = usePrefixCls(
      'formily-form-button-group',
      attrs.prefixCls as string
    )

    return () => {
      if (props.alignFormItem) {
        return h(
          FormBaseItem,
          {
            style: {
              margin: 0,
              padding: 0,
              width: '100%',
            },
            attrs: {
              colon: false,
              label: ' ',
              ...attrs,
            },
          },
          {
            default: () => h(Space, { props: { size: props.gutter } }, slots),
          }
        )
      } else {
        return h(
          Space,
          {
            class: [prefixCls],
            style: {
              justifyContent:
                props.align === 'left'
                  ? 'flex-start'
                  : props.align === 'right'
                  ? 'flex-end'
                  : 'center',
              display: 'flex',
            },
            props: {
              ...attrs,
              size: props.gutter,
            },
            attrs,
          },
          slots
        )
      }
    }
  },
})

export default FormButtonGroup
