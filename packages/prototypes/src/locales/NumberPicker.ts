export const NumberPicker = {
  'zh-CN': {
    title: '数字输入',
    settings: {
      'x-component-props': {
        placeholder: '占位提示',
        max: '最大值',
        min: '最小值',
        step: '步长',
        precision: '数字精度',
        decimalSeparator: '小数点',
        size: {
          title: '尺寸',
          dataSource: ['大', '小', '默认'],
        },
      },
    },
  },
  'en-US': {
    title: 'NumberInput',
    settings: {
      'x-component-props': {
        placeholder: 'Placeholder',
        max: 'Max',
        min: 'Min',
        step: 'Step',
        precision: 'Precision',
        decimalSeparator: 'Decimal Separator',
        size: {
          title: 'Size',
          dataSource: ['Large', 'Small', 'Default'],
        },
      },
    },
  },
}

export const InputNumber = NumberPicker
