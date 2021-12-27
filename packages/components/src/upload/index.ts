import { connect, mapProps } from '@formily/vue'
import { Upload as AntdUpload } from 'ant-design-vue'
import { composeExport } from '../__builtins__'

const _Upload = connect(
  AntdUpload,
  mapProps({
    value: 'fileList',
  })
)

const UploadDragger = connect(
  AntdUpload.Dragger,
  mapProps({
    value: 'fileList',
  })
)

export const Upload = composeExport(_Upload, {
  Dragger: UploadDragger,
})

export default Upload
