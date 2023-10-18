import type { ISchema } from '@formily/vue'

export const Switch: ISchema = {
  type: 'object',
  properties: {
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    defaultChecked: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    size: {
      type: 'string',
      default: 'default',
      enum: ['small', 'default'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        allowClear: true
      }
    }
  }
}
