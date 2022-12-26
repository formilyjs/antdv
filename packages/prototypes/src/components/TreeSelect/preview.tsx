import { Select as FormilyTreeSelect } from '@formily/antdv'
import { createBehavior, createResource } from '@designable/core'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const TreeSelect = composeExport(FormilyTreeSelect, {
  Behavior: createBehavior({
    name: 'TreeSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'TreeSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.TreeSelect),
    },
    designerLocales: AllLocales.TreeSelect,
  }),
  Resource: createResource({
    icon: 'TreeSelectSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          title: 'TreeSelect',
          'x-decorator': 'FormItem',
          'x-component': 'TreeSelect',
        },
      },
    ],
  }),
})
