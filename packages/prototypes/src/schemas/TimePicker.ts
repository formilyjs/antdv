import type { ISchema } from '@formily/vue'

export const CommonTimePickerAPI = {
  allowClear: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
    'x-component-props': {
      defaultChecked: true,
    },
  },
  clearText: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  autoFocus: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  placeholder: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      allowClear: true,
    },
  },
  defaultValue: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'TimePicker',
    'x-component-props': {
      align: {
        points: ['br', 'br'],
      },
    },
  },
  defaultOpenValue: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'TimePicker',
    'x-component-props': {
      align: {
        points: ['br', 'br'],
      },
    },
  },
  size: {
    default: 'default',
    type: 'string',
    enum: ['large', 'small', 'default'],
    'x-decorator': 'FormItem',
    'x-component': 'Select',
    'x-component-props': {
      allowClear: true,
    },
  },
  format: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      allowClear: true,
    },
  },
  valueFormat: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      allowClear: true,
    },
  },
  align: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ValueInput',
    'x-component-props': {
      include: ['EXPRESSION'],
    },
  },
  popupStyle: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ValueInput',
    'x-component-props': {
      include: ['EXPRESSION'],
    },
  },
  inputReadOnly: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
}

export const TimePicker: ISchema & { RangePicker?: ISchema } = {
  type: 'object',
  properties: CommonTimePickerAPI,
}
