import { connect, mapProps, h } from '@formily/vue'
import { Upload as AntdUpload, Button, Icon } from 'ant-design-vue'
import { defineComponent } from 'vue-demi'
import { composeExport } from '../__builtins__'
import type {
  UploadFile,
  Upload as AntdUploadProps,
} from 'ant-design-vue/types/upload'

export type IUploadOnchange = (fileList: UploadFile[]) => void

export type IUploadProps = Omit<AntdUploadProps, 'onChange'> & {
  textContent?: string
  onChange?: IUploadOnchange
}

export type IDraggerUploadProps = Omit<AntdUploadProps, 'onChange'> & {
  onChange?: IUploadOnchange
}

const UploadWrapper = defineComponent<IUploadProps>({
  name: 'UploadWrapper',
  props: ['textContent', 'onChange'],
  emits: ['change'],
  setup(props, { attrs, listeners, emit }) {
    return () => {
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
        {
          default: () => [
            h(
              Button,
              {},
              {
                default: () => [
                  h(
                    Icon,
                    {
                      props: {
                        type: 'upload',
                      },
                    },
                    {}
                  ),
                  props.textContent || '上传',
                ],
              }
            ),
          ],
        }
      )
    }
  },
})

const UploaDraggerdWrapper = defineComponent<IUploadProps>({
  name: 'UploaDraggerdWrapper',
  emits: ['change'],
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
