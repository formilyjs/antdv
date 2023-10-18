import type { ISchema } from '@formily/vue'

export const Upload: ISchema & { Dragger?: ISchema } = {
  type: 'object',
  properties: {
    textContent: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        allowClear: true
      }
    },
    action: {
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        allowClear: true
      }
    },
    headers: {
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION']
      }
    },
    multiple: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    data: {
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION']
      }
    },
    name: {
      default: 'file',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        allowClear: true
      }
    },
    'with-credentials': {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        allowClear: true
      }
    },
    'show-file-list': {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    drag: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    accept: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        allowClear: true
      }
    },
    'list-type': {
      enum: ['text', 'picture', 'picture-card'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'text',
        optionType: 'button',
        size: 'small'
      }
    },
    'auto-upload': {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    limit: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {}
    }
    // fileList: {}
    // method: {
    //   enum: ['POST', 'PUT', 'GET'],
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Radio.Group',
    //   'x-component-props': {
    //     defaultValue: 'POST',
    //     optionType: 'button',
    //     size: 'small',
    //   },
    // },
    // directory: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    // },
    // openFileDialogOnClick: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    //   'x-component-props': {
    //     defaultChecked: true,
    //   },
    // },
    // showUploadList: {
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    //   'x-component-props': {
    //     defaultChecked: true,
    //   },
    // },
  }
}
