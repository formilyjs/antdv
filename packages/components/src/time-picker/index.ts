import { TimePicker as AntdTimePicker } from 'ant-design-vue'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { dayjsable } from '../__builtins__'
import { PreviewText } from '../preview-text'

export const TimePicker = connect(
  AntdTimePicker,
  mapProps((props) => {
    return {
      ...props,
      defaultValue: dayjsable(props.defaultValue, props.valueFormat),
      defaultOpenValue: dayjsable(props.defaultOpenValue, props.valueFormat)
    }
  }),
  mapReadPretty(PreviewText.TimePicker)
)

export default TimePicker
