import { Cascader as AntdCascader, Icon } from 'ant-design-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { PreviewText } from '../preview-text'

export const Cascader = connect(
  AntdCascader,
  mapProps(
    {
      dataSource: 'options',
    },
    (props, field) => {
      return {
        ...props,
        suffixIcon:
          field?.['loading'] || field?.['validating']
            ? h(Icon, { props: { type: 'loading' } }, {})
            : props.suffixIcon,
      }
    }
  ),
  mapReadPretty(PreviewText.Cascader)
)

export default Cascader
