import { createLocales } from '@designable/core'

export const DatePicker = {
  'zh-CN': {
    title: '日期选择',
    settings: {
      'x-component-props': {
        editable: { title: '文本框可输入' },
        clearable: { title: '显示清除按钮' },
        size: { title: '尺寸' },
        placeholder: {
          title: '占位内容',
          tooltip: '非范围选择时的占位内容',
        },
        'start-placeholder': {
          title: '开始日期占位',
          tooltip: '开始日期占位内容',
        },
        'end-placeholder': {
          title: '结束日期占位',
          tooltip: '结束日期占位内容',
        },
        type: { title: '显示类型' },
        format: {
          title: '格式',
          tooptip: '显示在输入框中的格式',
        },
        align: { title: '对齐方式' },
        'popper-class': { title: '下拉框的类名' },
        'picker-options': { title: '选项' },
        'range-separator': { title: '分隔符' },
        'default-value': { title: '默认显示的日期' },
        'default-time': {
          title: '默认显示的时间',
          tooltip: '范围选择时选中日期所使用的当日内具体时刻',
        },
        'value-format': { title: '格式' },
        'unlink-panels': { title: '面板联动' },
        'prefix-icon': { title: '头部图标' },
        'clear-icon': { title: '清空图标' },
      },
    },
  },

  'en-US': {
    title: 'DatePicker',
    settings: {
      'x-component-props': {
        editable: { title: 'Editable' },
        clearable: { title: 'Show clear button' },
        size: { title: 'Size' },
        placeholder: 'Placeholder',
        'start-placeholder': 'Start input placeholder',
        'end-placeholder': 'End imput placeholder',
        type: { title: 'Type' },
        format: { title: 'Format' },
        align: { title: 'Align' },
        'popper-class': { title: 'Popper class' },
        'picker-options': { title: 'Picker options' },
        'range-separator': { title: 'Range separator' },
        'default-value': { title: 'Default date' },
        'default-time': { title: 'Default time' },
        'value-format': { title: 'Value format' },
        'unlink-panels': { title: 'Panels link' },
        'prefix-icon': { title: 'Prefix icon' },
        'clear-icon': { title: 'Clear icon' },
      },
    },
  },
}
