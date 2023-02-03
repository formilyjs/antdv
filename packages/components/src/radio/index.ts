import { defineComponent } from 'vue-demi'
import { Radio as AntdRadio } from 'ant-design-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import {
  composeExport,
  transformComponent,
  resolveComponent,
} from '../__builtins__'
import { PreviewText } from '../preview-text'

import type { PropType } from 'vue-demi'
import type { RadioGroup as AntdRadioGroupProps } from 'ant-design-vue/types/radio/radio-group'

const { Button, Group } = AntdRadio

export type RadioGroupProps = AntdRadioGroupProps & {
  optionType: 'defalt' | 'button'
}

const TransformRadioGroup = transformComponent(Group, {
  change: 'input',
})

const RadioGroupOption = defineComponent<RadioGroupProps>({
  name: 'RadioGroup',
  props: {
    options: {
      type: Array as PropType<RadioGroupProps['options']>,
      default: () => [],
    },
    optionType: {
      type: String as PropType<RadioGroupProps['optionType']>,
      default: 'default',
    },
  },
  setup(customProps, { attrs, slots, listeners }) {
    return () => {
      const options = customProps.options || []
      const Radio =
        customProps.optionType === 'button' ? AntdRadio.Button : AntdRadio
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option) => {
                  if (typeof option === 'string') {
                    return h(
                      Radio,
                      { props: { value: option } },
                      {
                        default: () => [
                          resolveComponent(slots?.option ?? option, { option }),
                        ],
                      }
                    )
                  } else {
                    return h(
                      Radio,
                      {
                        props: {
                          ...option,
                          value: option.value,
                          label: option.label,
                        },
                      },
                      {
                        default: () => [
                          resolveComponent(slots?.option ?? option.label, {
                            option,
                          }),
                        ],
                      }
                    )
                  }
                }),
            }
          : slots
      return h(
        TransformRadioGroup,
        {
          attrs: {
            ...attrs,
          },
          on: listeners,
        },
        children
      )
    }
  },
})

const RadioGroup = connect(
  RadioGroupOption,
  mapProps({ dataSource: 'options' }),
  mapReadPretty(PreviewText.Select)
)

export const Radio = composeExport(AntdRadio, {
  Group: RadioGroup,
})

export default Radio
