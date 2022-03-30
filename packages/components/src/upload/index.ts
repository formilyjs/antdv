import { connect, mapProps, h } from '@formily/vue'
import { Upload as AntdUpload } from 'ant-design-vue'
import { composeExport } from '../__builtins__'
import type {
  UploadFile,
  Upload as AntdUploadProps,
} from 'ant-design-vue/types/upload'
import { defineComponent } from '@vue/composition-api'

export type IUploadOnchange = (fileList: UploadFile[]) => void

export type IUploadProps = Omit<AntdUploadProps, 'onChange'> & {
  onChange?: IUploadOnchange
}

export type IDraggerUploadProps = Omit<AntdUploadProps, 'onChange'> & {
  onChange?: IUploadOnchange
}

const UploadWrapper = defineComponent<IUploadProps>({
  name: 'UploadWrapper',
  setup(props, { slots, attrs, listeners, emit }) {
    return () => {
      const children = {
        ...slots,
      }

      return h(
        AntdUpload,
        {
          attrs,
          on: {
            ...listeners,
            change: ({ fileList }) => {
              ;(attrs.onChange as IUploadOnchange)?.(fileList)
              emit('change', fileList)
            },
          },
        },
        children
      )
    }
  },
})

const UploaDraggerdWrapper = defineComponent<IUploadProps>({
  name: 'UploaDraggerdWrapper',
  setup(props, { slots, attrs, listeners, emit }) {
    return () => {
      const children = {
        ...slots,
      }

      return h(
        'div',
        {},
        {
          default: () =>
            h(
              AntdUpload.Dragger,
              {
                attrs,
                on: {
                  ...listeners,
                  change: ({ fileList }) => {
                    ;(attrs.onChange as IUploadOnchange)?.(fileList)
                    emit('change', fileList)
                  },
                },
              },
              children
            ),
        }
      )
    }
  },
})

const _Upload = connect(
  UploadWrapper,
  mapProps({
    value: 'fileList',
    onInput: 'onChange',
  })
)

const UploadDragger = connect(
  UploaDraggerdWrapper,
  mapProps({
    value: 'fileList',
    onInput: 'onChange',
  })
)

export const Upload = composeExport(_Upload, {
  Dragger: UploadDragger,
})

export default Upload
