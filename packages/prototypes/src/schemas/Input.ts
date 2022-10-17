import { merge } from '@formily/shared'
import type { ISchema } from '@formily/vue'

export const Input: ISchema & { TextArea?: ISchema } = {
  type: 'object',
  properties: {
    maxlength: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        size: 'mini',
      },
    },
    minlength: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        size: 'mini',
      },
    },
    'show-word-limit': {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        size: 'mini',
      },
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        clearable: true,
        size: 'mini',
      },
    },
    clearable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'prefix-icon': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'mini',
      },
    },
    'suffix-icon': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'mini',
      },
    },
    autofocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    size: {
      default: 'medium',
      type: 'string',
      enum: ['medium', 'small', 'mini', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
  },
}

Input.TextArea = merge(Input, {
  properties: {
    rows: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        size: 'mini',
      },
    },
    autoSize: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    size: {
      'x-visible': false,
    },
  },
})
