import { TimePicker as AntdTimePicker } from 'ant-design-vue'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { momentable } from '../__builtins__'
import { PreviewText } from '../preview-text'

export const TimePicker = connect(
  AntdTimePicker,
  mapProps((props) => {
    return {
      ...props,
      defaultValue: momentable(props.defaultValue, props.valueFormat),
      defaultOpenValue: momentable(props.defaultOpenValue, props.valueFormat),
    }
  }),
  mapReadPretty(PreviewText.TimePicker)
)

export default TimePicker
