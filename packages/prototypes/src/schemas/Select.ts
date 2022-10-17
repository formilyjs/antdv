import type { ISchema } from '@formily/vue'

export const Select: ISchema = {
  type: 'object',
  properties: {
    multiple: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'value-key': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'mini',
      },
    },
    size: {
      default: 'medium',
      type: 'string',
      enum: ['medium', 'small', 'mini', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    clearable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'collapse-tags': {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'multiple-limit': {
      default: 0,
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
        size: 'mini',
      },
    },
    filterable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'allow-create': {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'no-match-text': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'mini',
      },
    },
    'no-data-text': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'mini',
      },
    },
    'popper-class': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'mini',
      },
    },
    'reserve-keyword': {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'popper-append-to-body': {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'automatic-dropdown': {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
