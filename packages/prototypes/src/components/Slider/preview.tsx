import { Slider as AntSlider } from 'ant-design-vue'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@pind/designable-core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const Slider = composeExport(AntSlider, {
  Behavior: createBehavior({
    name: 'Slider',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Slider',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Slider)
    },
    designerLocales: AllLocales.Slider
  }),
  Resource: createResource({
    icon: 'SliderSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'number',
          title: 'Slider',
          'x-decorator': 'FormItem',
          'x-component': 'Slider'
        }
      }
    ]
  })
})
