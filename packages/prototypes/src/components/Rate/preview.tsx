import { Rate as ElRate } from 'ant-design-vue'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const Rate = composeExport(ElRate, {
  Behavior: createBehavior({
    name: 'Rate',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Rate',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Rate),
    },
    designerLocales: AllLocales.Rate,
  }),
  Resource: createResource({
    icon: 'RateSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'number',
          title: 'Rate',
          'x-decorator': 'FormItem',
          'x-component': 'Rate',
        },
      },
    ],
  }),
})
