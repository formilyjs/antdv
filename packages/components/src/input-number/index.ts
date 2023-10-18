import { InputNumber as AntdInputNumber } from 'ant-design-vue'
import { connect, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'

export const InputNumber = connect(AntdInputNumber, mapReadPretty(PreviewText.Input))

export default InputNumber
