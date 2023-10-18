import { connect, mapProps, mapReadPretty } from '@formily/vue'
import type { RadioGroupProps as AntdRadioGroupProps } from 'ant-design-vue'
import { Radio as AntdRadio, RadioGroup as AntdRadioGroup, RadioButton } from 'ant-design-vue'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { composeExport, resolveComponent, transformComponent } from '../__builtins__'
import { PreviewText } from '../preview-text'

export type RadioGroupProps = AntdRadioGroupProps & {
  optionType: 'default' | 'button'
}

const TransformRadioGroup = transformComponent(AntdRadioGroup, {
  change: 'input'
})

const RadioGroupOption = defineComponent({
  name: 'RadioGroup',
  props: {
    options: {
      type: Array as PropType<RadioGroupProps['options']>,
      default: () => []
    },
    optionType: {
      type: String as PropType<RadioGroupProps['optionType']>,
      default: 'default'
    }
  },
  setup(customProps, { attrs, slots }) {
    return () => {
      const options = customProps.options || []
      const Radio = customProps.optionType === 'button' ? RadioButton : AntdRadio
      const renderSlot = () => {
        return options.length !== 0
          ? {
              default: () =>
                options.map((option) => {
                  if (typeof option === 'string' || typeof option === 'number') {
                    return (
                      <Radio value={option}>
                        {resolveComponent(slots?.option ?? option, { option })}
                      </Radio>
                    )
                  } else {
                    return (
                      <Radio {...option} value={option.value}>
                        {resolveComponent(slots?.option ?? option.label, {
                          option
                        })}
                      </Radio>
                    )
                  }
                })
            }
          : slots
      }

      return <TransformRadioGroup {...attrs}>{renderSlot()}</TransformRadioGroup>
    }
  }
})

const RadioGroup = connect(
  RadioGroupOption,
  mapProps({ dataSource: 'options' }),
  mapReadPretty(PreviewText.Select)
)

export const Radio = composeExport(AntdRadio, {
  Group: RadioGroup
})

export default Radio
