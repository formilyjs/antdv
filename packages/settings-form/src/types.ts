import type { Form } from '@formily/core'
import type { VueComponent } from '@formily/vue'
import type { Upload as UploadProps } from 'ant-design-vue/types/upload'

export interface ISettingFormProps {
  uploadAction?: string | ((file: File) => Promise<string>)
  headers: Record<string, any>
  uploadProps?: Pick<
    UploadProps,
    | 'accept'
    | 'action'
    | 'data'
    | 'headers'
    | 'withCredentials'
    | 'customRequest'
  >
  components?: Record<string, VueComponent>
  effects?: (form: Form) => void
  scope?: any
}
