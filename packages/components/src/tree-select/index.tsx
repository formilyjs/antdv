import { LoadingOutlined } from '@ant-design/icons-vue'
import { connect, mapProps } from '@formily/vue'
import { TreeSelect as AntdTreeSelect } from 'ant-design-vue'

export const TreeSelect = connect(
  AntdTreeSelect,
  mapProps(
    {
      dataSource: 'treeData'
    },
    (props, field) => {
      return {
        ...props,
        suffixIcon:
          field?.['loading'] || field?.['validating'] ? <LoadingOutlined /> : props.suffixIcon
      }
    }
  )
)

export default TreeSelect
