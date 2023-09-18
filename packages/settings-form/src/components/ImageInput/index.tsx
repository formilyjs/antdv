import { defineComponent, ref } from 'vue-demi'
import { Input, Upload, Icon } from 'ant-design-vue'
import { usePrefix, IconWidget, useContext } from '@formily/antdv-designable'
import { SettingsFormSymbol } from '../../shared/context'
import './styles.less'

export interface ImageInputProps {
  value?: string
}

export const ImageInput = defineComponent({
  emits: ['change'],
  props: { value: String },
  setup(props, { emit }) {
    const prefixRef = usePrefix('image-input')
    const contextRef = useContext(SettingsFormSymbol)

    const uploadingRef = ref(false)

    return () => {
      const prefix = prefixRef.value
      const context = contextRef.value
      return (
        <div class={prefix}>
          <Input
            props={{
              ...props,
              allowClear: true,
            }}
            scopedSlots={{
              prefix: () => (
                <Upload
                  accept="image/*"
                  action={context.uploadAction}
                  customRequest={context.uploadCustomRequest}
                  method={context.uploadMethod}
                  headers={context.headers}
                  multiple={false}
                  showUploadList={false}
                  onChange={({ file: { status, response } }) => {
                    uploadingRef.value = status === 'uploading'
                    if (status === 'done') {
                      const url =
                        response?.url ||
                        response?.downloadURL ||
                        response?.imageURL ||
                        response?.thumbUrl ||
                        response?.data
                      if (!url) return
                      emit('change', url)
                    }
                  }}
                >
                  {uploadingRef.value ? (
                    <Icon type="loading" size={16} />
                  ) : (
                    <IconWidget
                      infer="CloudUpload"
                      {...{ style: { cursor: 'pointer' } }}
                      size={16}
                    />
                  )}
                </Upload>
              ),
            }}
            onInput={(e) => {
              emit('change', e.target.value)
            }}
          ></Input>
        </div>
      )
    }
  },
})

export const BackgroundImageInput = defineComponent({
  props: { value: String },
  emits: ['change'],
  setup(props, { emit }) {
    return () => {
      const addBgValue = (value: any) => {
        if (/url\([^)]+\)/.test(value)) {
          return value
        }
        return `url(${value})`
      }
      const removeBgValue = (value: any) => {
        const matched = String(value).match(/url\(\s*([^)]+)\s*\)/)
        if (matched?.[1]) {
          return matched?.[1]
        }
        return value
      }
      return (
        <ImageInput
          value={removeBgValue(props.value)}
          onChange={(url) => {
            emit('change', addBgValue(url))
          }}
        />
      )
    }
  },
}) as Vue.Component<any, any, any, ImageInputProps>
