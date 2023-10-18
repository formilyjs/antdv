import { Select as AntdSelect } from 'ant-design-vue'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'

export const Select = connect(
  AntdSelect,
  mapProps(
    {
      dataSource: 'options',
      loading: true
    },
    ({ useNull, ...props }, field) => {
      let value = props.value
      if (!useNull && value === null) {
        value = undefined
      }
      return {
        ...props,
        loading: field?.['loading'] || field?.['validating'] ? true : props.loading,
        value
      }
    }
  ),
  mapReadPretty(PreviewText.Select)
)

export default Select
