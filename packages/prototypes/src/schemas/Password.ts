import { Input } from './Input'
import type { ISchema } from '@formily/vue'
export const Password: ISchema = {
  type: 'object',
  properties: {
    ...(Input.properties as any),
    checkStrength: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
