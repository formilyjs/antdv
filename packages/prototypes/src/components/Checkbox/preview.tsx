import { Checkbox as FormilyCheckbox } from '@formily/antdv'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@pind/designable-core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const Checkbox = composeExport(FormilyCheckbox, {
  Behavior: createBehavior({
    name: 'Checkbox.Group',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Checkbox.Group',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Checkbox.Group)
    },
    designerLocales: AllLocales.CheckboxGroup
  }),
  Resource: createResource({
    icon: 'CheckboxGroupSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'array' || 'Array<string | number>',
          title: 'Checkbox Group',
          enum: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 }
          ],
          'x-decorator': 'FormItem',
          'x-component': 'Checkbox.Group'
        }
      }
    ]
  })
})
