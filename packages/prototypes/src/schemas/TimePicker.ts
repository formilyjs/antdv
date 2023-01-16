import type { ISchema } from '@formily/vue'

export const CommonTimePickerAPI = {
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
    default: 'default',
    type: 'string',
    enum: [
      {
        label: 'Large',
        value: 'large',
      },
      {
        label: 'Small',
        value: 'small',
      },
      {
        label: 'Default',
        value: 'default',
      },
    ],
    'x-decorator': 'FormItem',
    'x-component': 'Select',
    'x-component-props': {
      size: 'small',
      clearable: true,
    },
  },
  placeholder: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      size: 'small',
      clearable: true,
    },
  },
  'start-placeholder': {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      size: 'small',
      clearable: true,
    },
  },
  'end-placeholder': {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      size: 'small',
      clearable: true,
    },
  },
  'is-range': {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  'arrow-control': {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  align: {
    default: 'left',
    type: 'string',
    enum: ['left', 'center', 'right'],
    'x-decorator': 'FormItem',
    'x-component': 'Select',
    'x-component-props': {
      size: 'small',
      clearable: true,
    },
  },
  'popper-class': {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      size: 'small',
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
      size: 'small',
      clearable: true,
    },
  },
  'default-value': {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'DatePicker',
    'x-component-props': {
      align: {
        points: ['br', 'br'],
      },
    },
  },
  'value-format': {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      size: 'small',
      clearable: true,
    },
  },
  'prefix-icon': {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      size: 'small',
      clearable: true,
    },
  },
  'clear-icon': {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      size: 'small',
      clearable: true,
    },
  },
}

export const TimePicker: ISchema & { RangePicker?: ISchema } = {
  type: 'object',
  properties: CommonTimePickerAPI,
}
