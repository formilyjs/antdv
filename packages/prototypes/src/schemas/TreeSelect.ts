import type { ISchema } from '@formily/vue'

export const TreeSelect: ISchema = {
  type: 'object',
  properties: {
    allowClear: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    dropdownMatchSelectWidth: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true
      }
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input'
    },
    size: {
      type: 'string',
      default: 'default',
      enum: ['large', 'small', 'default'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {}
    },
    multiple: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-reactions': (field) => {
        field.visible = field.form?.values?.['x-component-props']?.treeCheckable === true
      }
    },
    maxTagCount: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {},
      'x-reactions': (field) => {
        field.visible = field.form?.values?.['x-component-props']?.mode === 'tags'
      }
    },
    maxTagPlaceholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        allowClear: true
      },
      'x-reactions': (field) => {
        field.visible = field.form?.values?.['x-component-props']?.mode === 'tags'
      }
    },
    labelInValue: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    filterTreeNode: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['BOOLEAN', 'EXPRESSION']
      }
    },
    showCheckedStrategy: {
      type: 'string',
      default: 'SHOW_CHILD',
      enum: ['SHOW_ALL', 'SHOW_PARENT', 'SHOW_CHILD'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {}
    },
    treeCheckable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    treeDataSimpleMode: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['BOOLEAN', 'EXPRESSION']
      }
    },
    treeDefaultExpandAll: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    treeDefaultExpandedKeys: {
      type: 'array<string|number>',
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION']
      }
    },
    treeNodeFilterProp: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input'
    },
    treeNodeLabelProp: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input'
    },
    showSearch: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    }
  }
}
