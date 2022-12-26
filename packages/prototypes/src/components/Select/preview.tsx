import { Select as FormilySelect } from '@formily/antdv'
import { createBehavior, createResource } from '@designable/core'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const Select = composeExport(FormilySelect, {
  Behavior: createBehavior({
    name: 'Select',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Select',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: AllLocales.Select,
  }),
  Resource: createResource({
    icon: 'SelectSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          title: 'Select',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
        },
      },
    ],
  }),
})
