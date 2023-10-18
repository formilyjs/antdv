import type { ISchema } from '@formily/vue'
import { CSSStyle } from './CSSStyle'
import { FormLayout } from './FormLayout'

export const Form: ISchema = {
  type: 'object',
  properties: {
    ...(FormLayout.properties as Exclude<ISchema['properties'], string>),
    style: CSSStyle
  }
}
