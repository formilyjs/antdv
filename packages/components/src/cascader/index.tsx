import { LoadingOutlined } from '@ant-design/icons-vue'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { Cascader as AntdCascader } from 'ant-design-vue'
import { PreviewText } from '../preview-text'

export const Cascader = connect(
  AntdCascader,
  mapProps(
    {
      dataSource: 'options'
    },
    ({ useNull, ...props }, field) => {
      let value = props.value
      if (!useNull && Array.isArray(value)) {
        value = value.map((item) => (item === null ? undefined : item))
      }
      return {
        ...props,
        suffixIcon:
          field?.['loading'] || field?.['validating'] ? <LoadingOutlined /> : props.suffixIcon
      }
    }
  ),
  mapReadPretty(PreviewText.Cascader)
)

export default Cascader
