import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { Select as AntdSelect } from 'ant-design-vue'
import { PreviewText } from '../preview-text'

export const Select = connect(
  AntdSelect,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
    },
    (props, field) => {
      return {
        ...props,
        loading:
          field?.['loading'] || field?.['validating'] ? true : props.loading,
      }
    }
  ),
  mapReadPretty(PreviewText.Select)
)

export default Select
