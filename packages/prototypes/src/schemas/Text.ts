import type { ISchema } from '@formily/vue'

export const Text: ISchema = {
  type: 'object',
  properties: {
    mode: {
      type: 'string',
      default: 'normal',
      enum: ['h1', 'h2', 'h3', 'p', 'normal'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {},
    },
    content: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
    },
  },
}
