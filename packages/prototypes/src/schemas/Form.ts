import { FormLayout } from './FormLayout'
import { CSSStyle } from './CSSStyle'
import type { ISchema } from '@formily/vue'

export const Form: ISchema = {
  type: 'object',
  properties: {
    ...(FormLayout.properties as any),
    style: CSSStyle,
  },
}
