import type { ISchema } from '@formily/vue'

export const FormTab: ISchema & { TabPane?: ISchema } = {
  type: 'object',
  properties: {
    animated: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    hideAdd: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    type: {
      type: 'string',
      default: 'line',
      enum: ['line', 'card', 'editable-card'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        allowClear: true
      }
    },
    size: {
      type: 'string',
      default: 'default',
      enum: ['large', 'samll', 'default'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        allowClear: true
      }
    },
    tabPosition: {
      type: 'string',
      default: 'top',
      enum: ['top', 'right', 'bottom', 'left'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        allowClear: true
      }
    },
    tabBarGutter: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {}
    }
  }
}

FormTab.TabPane = {
  type: 'object',
  properties: {
    tab: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        allowClear: true
      }
    },
    disabled: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    name: {
      'x-visible': false,
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        allowClear: true
      }
    },
    closable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    lazy: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    }
  }
}
