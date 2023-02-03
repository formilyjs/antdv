import type { ISchema } from '@formily/vue'

export const Transfer: ISchema = {
  type: 'object',
  properties: {
    titles: {
      type: 'void',
      'x-component': 'div',
      'x-decorator': 'FormItem',
      properties: {
        'titles[0]': {
          type: 'string',
          'x-component': 'Input',
          'x-component-props': {
            allowClear: true,
          },
        },
        'titles[1]': {
          type: 'string',
          'x-component': 'Input',
          'x-component-props': {
            allowClear: true,
          },
        },
      },
    },
    operations: {
      type: 'void',
      'x-component': 'div',
      'x-decorator': 'FormItem',
      properties: {
        'operations[0]': {
          type: 'string',
          'x-component': 'Input',
          'x-component-props': {
            allowClear: true,
          },
        },
        'operations[1]': {
          type: 'string',
          'x-component': 'Input',
          'x-component-props': {
            allowClear: true,
          },
        },
      },
    },
    lazy: {
      type: 'boolean|object',
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['BOOLEAN', 'EXPRESSION'],
      },
    },
    render: {
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION'],
      },
    },
    showSearch: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    showSelectAll: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
  },
}
