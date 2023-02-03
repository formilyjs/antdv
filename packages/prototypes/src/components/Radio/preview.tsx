import { Radio as FormilyRadio } from '@formily/antdv'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const Radio = composeExport(FormilyRadio, {
  Behavior: createBehavior({
    name: 'Radio.Group',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Radio.Group',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Radio.Group),
    },
    designerLocales: AllLocales.RadioGroup,
  }),
  Resource: createResource({
    icon: 'RadioGroupSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string | number',
          title: 'Radio Group',
          enum: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 },
          ],
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
        },
      },
    ],
  }),
})
