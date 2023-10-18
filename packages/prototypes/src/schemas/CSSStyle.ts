import type { ISchema } from '@formily/vue'

export const CSSStyle: ISchema = {
  type: 'void',
  properties: {
    'style.width': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput'
    },
    'style.height': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput'
    },
    'style.display': {
      'x-component': 'DisplayStyleSetter'
    },
    'style.background': {
      'x-component': 'BackgroundStyleSetter',
      'x-component-props': {
        allowClear: true
      }
    },
    'style.boxShadow': {
      'x-component': 'BoxShadowStyleSetter',
      'x-component-props': {
        allowClear: true
      }
    },
    'style.font': {
      'x-component': 'FontStyleSetter',
      'x-component-props': {
        allowClear: true
      }
    },
    'style.margin': {
      'x-component': 'BoxStyleSetter'
    },
    'style.padding': {
      'x-component': 'BoxStyleSetter'
    },
    'style.borderRadius': {
      'x-component': 'BorderRadiusStyleSetter'
    },
    'style.border': {
      'x-component': 'BorderStyleSetter'
    },
    'style.opacity': {
      'x-decorator': 'FormItem',
      'x-component': 'Slider',
      'x-component-props': {
        defaultValue: 1,
        min: 0,
        max: 1,
        step: 0.01
      }
    }
  }
}
