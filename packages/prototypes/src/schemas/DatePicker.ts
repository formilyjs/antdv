import type { ISchema } from '@formily/vue'

export const DatePicker: ISchema & { RangePicker?: ISchema } = {
  type: 'object',
  properties: {
    editable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    clearable: {
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
      'x-component-props': {
        size: 'mini',
        clearable: true,
      },
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'mini',
        clearable: true,
      },
    },
    'start-placeholder': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'mini',
        clearable: true,
      },
    },
    'end-placeholder': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'mini',
        clearable: true,
      },
    },
    type: {
      default: 'date',
      type: 'string',
      enum: [
        'year',
        'month',
        'date',
        'dates',
        'week',
        'datetime',
        'datetimerange',
        'daterange',
        'monthrange',
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        size: 'mini',
        clearable: true,
      },
    },
    format: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'mini',
        clearable: true,
      },
    },
    align: {
      default: 'left',
      type: 'string',
      enum: ['left', 'center', 'right'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        size: 'mini',
        clearable: true,
      },
    },
    'popper-class': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'mini',
        clearable: true,
      },
    },
    'picker-options': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'PreviewText.Input',
    },
    'range-separator': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'mini',
        clearable: true,
      },
    },
    'default-value': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
    },
    'default-time': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker',
    },
    'value-format': {
      default: 'timestamp',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'mini',
        clearable: true,
      },
    },
    'unlink-panels': {
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
        clearable: true,
      },
    },
    'clear-icon': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'mini',
        clearable: true,
      },
    },
  },
}
