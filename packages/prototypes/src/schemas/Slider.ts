import { GlobalRegistry } from '@designable/core'
import type { ISchema } from '@formily/vue'

export const Slider: ISchema = {
  type: 'object',
  properties: {
    allowClear: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    min: {
      type: 'number',
      default: 0,
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {},
    },
    max: {
      type: 'number',
      default: 100,
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {},
    },
    step: {
      type: 'number',
      default: 1,
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {},
    },
    dots: {
      title: GlobalRegistry.getDesignerMessage('settings.sliderDots'),
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    range: {
      title: GlobalRegistry.getDesignerMessage('settings.sliderRange'),
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    reverse: {
      title: GlobalRegistry.getDesignerMessage('settings.sliderReverse'),
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    vertical: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    tooltipVisible: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    tooltipPlacement: {
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION'],
      },
    },
    marks: {
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['EXPRESSION'],
      },
    },
  },
}
