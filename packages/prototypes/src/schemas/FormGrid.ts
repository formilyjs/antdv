import type { ISchema } from '@formily/vue'

export const FormGrid: ISchema & { GridColumn?: ISchema } = {
  type: 'object',
  properties: {
    minWidth: {
      type: 'number',
      default: 100,
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {}
    },
    maxWidth: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber'
    },
    minColumns: {
      type: 'number',
      default: 0,
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {}
    },
    maxColumns: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber'
    },
    breakpoints: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION']
      }
    },
    columnGap: {
      type: 'number',
      default: 10,
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {}
    },
    rowGap: {
      type: 'number',
      default: 5,
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {}
    },
    colWrap: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true
      }
    },
    strictAutoFit: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    }
  }
}

FormGrid.GridColumn = {
  type: 'object',
  properties: {
    gridSpan: {
      default: 1,
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {}
    }
  }
}
