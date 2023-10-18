import type { ISchema } from '@formily/vue'

export const Checkbox: ISchema & { Group?: ISchema } = {
  type: 'object',
  properties: {
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    }
  }
}

Checkbox.Group = {
  type: 'object',
  properties: {}
}
