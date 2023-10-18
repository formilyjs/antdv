import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { Input as AntInput, Textarea as AntTextarea } from 'ant-design-vue'
import type { InputProps as AntInputProps } from 'ant-design-vue/es/input'
import { composeExport, transformComponent } from '../__builtins__'
import { PreviewText } from '../preview-text'

const TransformAntInput = transformComponent<AntInputProps>(AntInput, {
  change: 'input'
})

const TransformTextarea = transformComponent<AntInputProps>(AntTextarea, {
  change: 'input'
})

const InnerInput = connect(
  TransformAntInput,
  mapProps({ readOnly: 'read-only' }),
  mapReadPretty(PreviewText.Input)
)
const TextArea = connect(
  TransformTextarea,
  mapProps({ readOnly: 'read-only' }),
  mapReadPretty(PreviewText.Input)
)

export const Input = composeExport(InnerInput, {
  TextArea
})

export default Input
