import type { ISchema } from '@formily/vue'

export const FormLayout: ISchema = {
  type: 'object',
  properties: {
    labelCol: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber'
    },
    wrapperCol: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber'
    },
    labelWidth: {
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput'
    },
    wrapperWidth: {
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput'
    },
    colon: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    feedbackLayout: {
      type: 'string',
      enum: ['loose', 'terse', 'popover', 'none', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select'
    },
    size: {
      type: 'string',
      enum: ['large', 'small', 'default', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select'
    },
    layout: {
      type: 'string',
      enum: ['vertical', 'horizontal', 'inline', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select'
    },
    tooltipLayout: {
      type: 'string',
      enum: ['icon', 'text', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select'
    },
    labelAlign: {
      type: 'string',
      enum: ['left', 'right', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select'
    },
    wrapperAlign: {
      type: 'string',
      enum: ['left', 'right', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select'
    },
    labelWrap: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    wrapperWrap: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },

    fullness: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    inset: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    shallow: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    bordered: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    }
  }
}
