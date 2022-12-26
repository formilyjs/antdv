import type { ISchema } from '@formily/vue'

export const Cascader: ISchema = {
  type: 'object',
  properties: {
    props: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'PreviewText.Input',
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
    clearable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'show-all-levels': {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'collapse-tags': {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    separator: {
      default: '/',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'small',
        clearable: true,
      },
    },
    filterable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'filter-method': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'PreviewText.Input',
    },
    debounce: {
      default: 300,
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        size: 'small',
      },
    },
    'before-filter': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'PreviewText.Input',
    },
    'popper-class': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'small',
      },
    },
  },
}
