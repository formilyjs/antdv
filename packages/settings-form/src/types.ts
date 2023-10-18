import type { Form } from '@formily/core'
import type { VueComponent } from '@formily/vue'
import type { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface'

export interface ISettingFormProps {
  uploadAction?: string | ((file: File) => Promise<any>)
  uploadMethod?: 'post' | 'POST' | 'PUT' | 'PATCH' | 'put' | 'patch'
  uploadCustomRequest?: (options: UploadRequestOption) => void
  headers?: Record<string, any>
  components?: Record<string, VueComponent>
  effects?: (form: Form) => void
  scope?: any
}
