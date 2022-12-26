import { Transfer as FormilyTransfer } from '@formily/antdv'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const Transfer = composeExport(FormilyTransfer, {
  Resource: createResource({
    icon: 'TransferSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          title: 'Transfer',
          'x-decorator': 'FormItem',
          'x-component': 'Transfer',
        },
      },
    ],
  }),
  Behavior: createBehavior({
    name: 'Transfer',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Transfer',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Transfer),
    },
    designerLocales: AllLocales.Transfer,
  }),
})
