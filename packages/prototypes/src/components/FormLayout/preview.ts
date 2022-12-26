import { FormLayout as FormilyFormLayout } from '@formily/antdv'
import { createBehavior, createResource } from '@designable/core'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { withContainer } from '../../common/Container'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const FormLayout = composeExport(withContainer(FormilyFormLayout), {
  Behavior: createBehavior({
    name: 'FormLayout',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'FormLayout',
    designerProps: {
      droppable: true,
      propsSchema: createVoidFieldSchema(AllSchemas.FormLayout),
    },
    designerLocales: AllLocales.FormLayout,
  }),
  Resource: createResource({
    icon: 'FormLayoutSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': 'FormLayout',
        },
      },
    ],
  }),
})
