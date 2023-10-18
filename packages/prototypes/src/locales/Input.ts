import { createLocales } from '@pind/designable-core'

export const Input = {
  'zh-CN': {
    title: '输入框',
    settings: {
      'x-component-props': {
        maxLength: '最大输入长度',
        placeholder: '占位提示',
        allowClear: '可清空',
        prefix: '前缀图标',
        suffix: '后缀图标',
        type: {
          title: 'input 类型',
          tooltip: '同原生 input 标签的 type 属性,(请直接使用 Input.TextArea 代替 type="textarea")'
        },
        size: {
          title: '尺寸',
          dataSource: ['大', '小', '默认']
        }
      }
    }
  },
  'en-US': {
    title: 'Input',
    settings: {
      'x-component-props': {
        maxLength: 'Max length',
        placeholder: 'Placehoder',
        allowClear: 'Allow clear',
        prefix: 'Prefix icon',
        suffix: 'Suffix icon',
        type: {
          title: 'Type of input',
          tooltips: 'use Input.TextArea instead of type="textarea"'
        },
        size: {
          title: 'Size',
          dataSource: ['Large', 'Small', 'Default']
        }
      }
    }
  }
}

export const TextArea = createLocales(Input, {
  'zh-CN': {
    title: '多行输入',
    settings: {
      'x-component-props': {
        autoSize: {
          title: '自适应高度',
          tooltip: '可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }'
        }
      }
    }
  },
  'en-US': {
    title: 'TextArea',
    settings: {
      'x-component-props': {
        autoSize: {
          title: 'Auto size',
          tooltip:
            'Height autosize feature, can be set to true|false or an object { minRows: 2, maxRows: 6 }'
        }
      }
    }
  }
})
