import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { Input } from 'ant-design-vue'
import { PreviewText } from '../preview-text'

const { Password: AntdPassword } = Input

export const Password = connect(
  AntdPassword,
  mapProps((props) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export default Password
