import { Checkbox as AntdCheckbox } from 'ant-design-vue'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { composeExport } from '../__builtins__'
import { PreviewText } from '../preview-text'

const { Group } = AntdCheckbox

const CheckboxGroup = connect(
  Group,
  mapProps({
    dataSource: 'options'
  }),
  mapReadPretty(PreviewText.Select, {
    mode: 'tags'
  })
)

const _CheckBox = connect(
  AntdCheckbox,
  mapProps({
    value: 'checked',
    onInput: 'onChange'
  })
)

export const Checkbox = composeExport(_CheckBox, {
  Group: CheckboxGroup
})

export default Checkbox
