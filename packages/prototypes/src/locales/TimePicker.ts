import { createLocales } from '@pind/designable-core'
import { DatePicker } from './DatePicker'

export const TimePicker = createLocales(DatePicker, {
  'zh-CN': {
    title: '时间选择',
    settings: {
      'x-component-props': {
        allowClear: '显示清除按钮',
        clearText: '清除按钮的提示文案',
        autoFocus: '自动获取焦点',
        placeholder: '占位提示',
        defaultValue: '默认时间',
        defaultOpenValue: {
          title: '默认选择时间',
          tooltip: '当 value defaultValue 没有时时起作用'
        },
        size: {
          title: '尺寸',
          dataSource: ['大', '小', '默认']
        },
        format: {
          title: '显示格式',
          tooltip: '显示在输入框中的格式，请参考 "moment.js" 设置'
        },
        valueFormat: {
          title: '绑定值格式',
          tooltip: '绑定值的格式，对 value、defaultValue、defaultPickerValue 起作用'
        },
        align: {
          title: '对齐方式',
          tooltip: '请参考 "dom-align" 设置'
        },
        inputReadOnly: '输入框只读',
        popupStyle: '弹出日历样式'
      }
    }
  },
  'en-US': {
    title: 'Time Picker',
    settings: {
      'x-component-props': {
        allowClear: 'Allow clear',
        clearText: 'Clear button text',
        autoFocus: 'Auto focus',
        placeholder: 'Placeholder',
        defaultValue: 'Default time',
        defaultOpenValue: {
          title: 'Default picker time',
          tooltip: 'When value and defaultValue are not specified'
        },
        size: {
          title: 'Size',
          dataSource: ['Large', 'Small', 'Default']
        },
        format: {
          title: 'Display format',
          tooltip: 'Please refer to the settings "moment.js"'
        },
        valueFormat: {
          title: 'Value format',
          tooltip:
            'Format of binding value. If not specified, the binding value will be a Date object'
        },
        align: {
          title: 'Align',
          tooltip: 'Please refer to the settings "dom-align"'
        },
        inputReadOnly: 'Input readonly',
        popupStyle: 'Popup style'
      }
    }
  }
})
