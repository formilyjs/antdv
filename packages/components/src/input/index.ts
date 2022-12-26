import { Input as AntInput } from 'ant-design-vue'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { composeExport, transformComponent } from '../__builtins__/shared'
import { PreviewText } from '../preview-text'
import type { Input as AntInputProps } from 'ant-design-vue/types/input/input'

const TransformElInput = transformComponent<AntInputProps>(AntInput, {
  change: 'input',
})

const InnerInput = connect(
  TransformElInput,
  mapProps({ readOnly: 'read-only' }),
  mapReadPretty(PreviewText.Input)
)
const TextArea = connect(
  InnerInput,
  mapProps((props) => {
    return {
      ...props,
      type: 'textarea',
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export const Input = composeExport(InnerInput, {
  TextArea,
})

export default Input
