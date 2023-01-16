import { TreeSelect as AntdTreeSelect, Icon } from 'ant-design-vue'
import { connect, mapProps, h } from '@formily/vue'

export const TreeSelect = connect(
  AntdTreeSelect,
  mapProps(
    {
      dataSource: 'treeData',
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
  )
)

export default TreeSelect
