import type { ISchema } from '@formily/vue'
export const NumberPicker: ISchema = {
  type: 'object',
  properties: {
    min: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        size: 'mini',
      },
    },
    max: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        size: 'mini',
      },
    },
    step: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        size: 'mini',
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
        size: 'mini',
      },
    },
    size: {
      default: 'medium',
      type: 'string',
      enum: ['medium', 'small', 'mini', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        size: 'mini',
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
        size: 'mini',
      },
    },
  },
}
export const InputNumber = NumberPicker
