import { connect, mapProps } from '@formily/vue'
import { Switch as AntdSwitch } from 'ant-design-vue'

export const Switch = connect(
  AntdSwitch,
  mapProps({ readOnly: 'read-only', value: 'checked' })
)

export default Switch
