import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { TimePicker as AntdTimePicker } from 'ant-design-vue'
import { PreviewText } from '../preview-text'

export const TimePicker = connect(
  AntdTimePicker,
  mapProps({ readOnly: 'read-only' }),
  mapReadPretty(PreviewText.TimePicker)
)

export default TimePicker
