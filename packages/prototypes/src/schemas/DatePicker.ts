import type { ISchema } from '@formily/vue'

export const DatePicker: ISchema & {
  RangePicker?: ISchema
} = {
  type: 'object',
  properties: {
    mode: {
      type: 'string',
      default: 'date',
      enum: ['time', 'date', 'month', 'year', 'decade'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        allowClear: true
      }
    },
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
    defaultValue: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        allowClear: true,
        align: {
          points: ['br', 'br']
        }
      }
    },
    defaultPickerValue: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        allowClear: true,
        align: {
          points: ['br', 'br']
        }
      }
    },
    size: {
      type: 'string',
      enum: ['large', 'small', 'default'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        value: 'default',
        allowClear: true
      }
    },
    format: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        allowClear: true
      }
    },
    valueFormat: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        allowClear: true
      }
    },
    align: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION']
      }
    },
    popupStyle: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION']
      }
    },
    inputReadOnly: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    showTime: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {},
      'x-reactions': (field) => {
        // TIPS: mode 指定后，选择面板无法切换
        field.visible = !field.form?.values?.['x-component-props']?.mode
      }
    },
    showToday: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true
      },
      'x-reactions': (field) => {
        const mode = field.form?.values?.['x-component-props']?.mode
        field.visible = !mode || mode === 'date'
      }
    }
  }
}

DatePicker.RangePicker = {
  type: 'object',
  properties: {
    ...(DatePicker.properties as object),
    placeholder: {
      type: 'void',
      'x-decorator': 'FormItem',
      'x-component': 'div',
      properties: {
        'placeholder[0]': {
          type: 'string',
          'x-component': 'Input',
          'x-component-props': {
            allowClear: true
          }
        },
        'placeholder[1]': {
          type: 'string',
          'x-component': 'Input',
          'x-component-props': {
            allowClear: true
          }
        }
      }
    },
    defaultValue: {
      type: 'void',
      'x-decorator': 'FormItem',
      'x-component': 'div',
      properties: {
        'defaultValue[0]': {
          type: 'string',
          'x-component': 'DatePicker',
          'x-component-props': {
            allowClear: true,
            align: {
              points: ['br', 'br']
            }
          }
        },
        'defaultValue[1]': {
          type: 'string',
          'x-component': 'DatePicker',
          'x-component-props': {
            allowClear: true,
            align: {
              points: ['br', 'br']
            }
          }
        }
      }
    },
    defaultPickerValue: {
      type: 'void',
      'x-decorator': 'FormItem',
      'x-component': 'div',
      properties: {
        'defaultPickerValue[0]': {
          type: 'string',
          'x-component': 'DatePicker',
          'x-component-props': {
            allowClear: true,
            align: {
              points: ['br', 'br']
            }
          }
        },
        'defaultPickerValue[1]': {
          type: 'string',
          'x-component': 'DatePicker',
          'x-component-props': {
            allowClear: true,
            align: {
              points: ['br', 'br']
            }
          }
        }
      }
    },
    separator: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        allowClear: true
      }
    }
  }
}
