import type { ISchema } from '@formily/vue'

export const Radio: ISchema & { Group?: ISchema } = {
  type: 'object',
  properties: {
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}

Radio.Group = {
  type: 'object',
  properties: {
    optionType: {
      type: 'string',
      enum: ['default', 'button'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'default',
        optionType: 'button',
        size: 'small',
      },
    },
    buttonStyle: {
      type: 'string',
      enum: ['outline', 'solid'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'outline',
        optionType: 'button',
        size: 'small',
      },
    },
    size: {
      default: 'default',
      type: 'string',
      enum: ['large', 'small', 'default'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        allowClear: true,
      },
      'x-reactions': (field) => {
        field.visible =
          field.form?.values?.['x-component-props']?.optionType === 'button'
      },
    },
  },
}
