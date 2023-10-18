import { TreeSelect as FormilyTreeSelect } from '@formily/antdv'
import { createBehavior, createResource } from '@pind/designable-core'
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
      propsSchema: createFieldSchema(AllSchemas.TreeSelect)
    },
    designerLocales: AllLocales.TreeSelect
  }),
  Resource: createResource({
    icon: 'TreeSelectSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          title: 'TreeSelect',
          enum: [
            {
              value: 1,
              label: '项目1',
              children: [
                {
                  value: 11,
                  label: '项目1-1',
                  disableCheckbox: true,
                  selectable: true
                },
                {
                  value: 12,
                  label: '项目1-2'
                }
              ]
            },
            {
              value: 2,
              label: '项目2',
              children: [
                {
                  value: 21,
                  label: '项目2-1'
                },
                {
                  value: 12,
                  label: '项目2-2'
                }
              ]
            }
          ],
          'x-decorator': 'FormItem',
          'x-component': 'TreeSelect'
        }
      }
    ]
  })
})
