import type { ISchema } from '@formily/vue'

export const Checkbox: ISchema & { Group?: ISchema } = {
  type: 'object',
  properties: {
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}

Checkbox.Group = {
  type: 'object',
  properties: {
    optionType: {
      type: 'string',
      enum: ['default', 'button'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        size: 'small',
        optionType: 'button',
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
      'x-reactions': (field) => {
        field.visible =
          field.form?.values?.['x-component-props']?.optionType === 'button'
      },
    },
  },
}
