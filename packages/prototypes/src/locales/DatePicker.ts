import { createLocales } from '@pind/designable-core'

export const DatePicker = {
  'zh-CN': {
    title: '日期选择',
    settings: {
      'x-component-props': {
        allowClear: '显示清除按钮',
        autoFocus: '自动获取焦点',
        placeholder: '占位提示',
        defaultValue: '默认日期',
        defaultPickerValue: {
          title: '默认选择日期',
          tooltip: '当 value defaultValue 没有时时起作用'
        },
        size: {
          title: '尺寸',
          dataSource: ['大', '小', '默认']
        },
        mode: {
          title: '日期面板的状态',
          dataSource: ['时间', '日期', '月份', '年', '十年']
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
        popupStyle: '弹出日历样式',
        showTime: '显示时间',
        showToday: '显示今天'
      }
    }
  },
  'en-US': {
    title: 'DatePicker',
    settings: {
      'x-component-props': {
        allowClear: 'Allow clear',
        autoFocus: 'Auto focus',
        placeholder: 'Placeholder',
        defaultValue: 'Default date',
        defaultPickerValue: {
          title: 'Default picker date',
          tooltip: 'When value and defaultValue are not specified'
        },
        size: {
          title: 'Size',
          dataSource: ['Large', 'Small', 'Default']
        },
        mode: {
          title: 'Picker type',
          dataSource: ['Time', 'Date', 'Month', 'Year', 'Decade']
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
        popupStyle: 'Popup style',
        showTime: 'Show time',
        showToday: 'Show today'
      }
    }
  }
}

export const DateRangePicker = createLocales(DatePicker, {
  'zh-CN': {
    title: '日期区间',
    settings: {
      'x-component-props': {
        separator: '分隔符'
      }
    }
  },
  'en-US': {
    title: 'RangePicker',
    settings: {
      'x-component-props': {
        separator: 'Separator'
      }
    }
  }
})
