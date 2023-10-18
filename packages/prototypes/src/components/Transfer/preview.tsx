import { Transfer as FormilyTransfer } from '@formily/antdv'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@pind/designable-core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const Transfer = composeExport(FormilyTransfer, {
  Behavior: createBehavior({
    name: 'Transfer',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Transfer',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Transfer)
    },
    designerLocales: AllLocales.Transfer
  }),
  Resource: createResource({
    icon: 'TransferSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          title: 'Transfer',
          enum: [
            {
              key: '1',
              title: '项目1',
              description: '描述项目1',
              disabled: false
            },
            {
              key: '2',
              title: '项目2',
              description: '描述项目2',
              disabled: true
            }
          ],
          'x-decorator': 'FormItem',
          'x-component': 'Transfer'
        }
      }
    ]
  })
})
