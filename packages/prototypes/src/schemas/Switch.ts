import type { ISchema } from '@formily/vue'

export const Switch: ISchema = {
  type: 'object',
  properties: {
    // width: {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'InputNumber',
    //   'x-component-props': {
    //     size: 'small',
    //     clearable: true,
    //   },
    // },
    // 'active-icon-class': {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    //   'x-component-props': {
    //     size: 'small',
    //     clearable: true,
    //   },
    // },
    // 'inactive-icon-class': {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    //   'x-component-props': {
    //     size: 'small',
    //     clearable: true,
    //   },
    // },
    // 'active-text': {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    //   'x-component-props': {
    //     size: 'small',
    //     clearable: true,
    //   },
    // },
    // 'inactive-text': {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    //   'x-component-props': {
    //     size: 'small',
    //     clearable: true,
    //   },
    // },
    // 'active-value': {
    //   type: 'string|boolean|number',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'ValueInput',
    //   'x-component-props': {
    //     exclude: ['EXPRESSION'],
    //     size: 'small',
    //     clearable: true,
    //   },
    // },
    // 'inactive-value': {
    //   type: 'string|boolean|number',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'ValueInput',
    //   'x-component-props': {
    //     exclude: ['EXPRESSION'],
    //     size: 'small',
    //     clearable: true,
    //   },
    // },
    // 'active-color': {
    //   type: 'string|boolean|number',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'ColorInput',
    //   'x-component-props': {},
    // },
    // 'inactive-color': {
    //   type: 'string|boolean|number',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'ColorInput',
    //   'x-component-props': {},
    // },
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    size: {
      default: 'default',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
  },
}
