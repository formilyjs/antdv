import type { ISchema } from '@formily/vue'

export const Cascader: ISchema = {
  type: 'object',
  properties: {
    allowClear: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true
      }
    },
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        allowClear: true
      }
    },
    size: {
      default: 'default',
      type: 'string',
      enum: ['large', 'small', 'default'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        allowClear: true
      }
    },
    popupPlacement: {
      default: 'bottomLeft',
      type: 'string',
      enum: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        allowClear: true
      }
    },
    showSearch: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    changeOnSelect: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    displayRender: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION']
      }
    },
    fieldNames: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION']
      }
    }
  }
}
