import type { Form } from '@formily/core'
import type { VueComponent } from '@formily/vue'
import type { Upload as UploadProps } from 'ant-design-vue/types/upload'

export interface ISettingFormProps {
  uploadAction?: string | ((file: File) => Promise<any>)
  uploadMethod?: string
  uploadCustomRequest?: Function
  headers?: Record<string, any>
  components?: Record<string, VueComponent>
  effects?: (form: Form) => void
  scope?: any
}
