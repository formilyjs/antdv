import type { ISchema } from '@formily/vue'
export const NumberPicker: ISchema = {
  type: 'object',
  properties: {
    min: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        size: 'small',
      },
    },
    max: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        size: 'small',
      },
    },
    step: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        size: 'small',
      },
    },
    'step-strictly': {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    precision: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        size: 'small',
      },
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
      },
    },
    controls: {
      default: true,
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    // 'controls-position': {
    //   type: 'string',
    //   enum: ['right', null],
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Select',
    // },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'small',
      },
    },
  },
}
export const InputNumber = NumberPicker
