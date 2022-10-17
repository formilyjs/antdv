import { Radio as FormilyRadio } from '@formily/antdv'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import type { DnFC } from '@formily/antdv-designable'
import type { VueComponent } from '@formily/vue'

export const Radio: DnFC<VueComponent<typeof FormilyRadio>> = composeExport(
  FormilyRadio,
  {
    Behavior: createBehavior({
      name: 'Radio.Group',
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === 'Radio.Group',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.Checkbox.Group),
      },
      designerLocales: AllLocales.CheckboxGroup,
    }),
    Resource: createResource({
      icon: 'RadioGroupSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'string | number',
            title: 'Radio Group',
            'x-decorator': 'FormItem',
            'x-component': 'Radio.Group',
            enum: [
              { label: '选项1', value: 1 },
              { label: '选项2', value: 2 },
            ],
          },
        },
      ],
    }),
  }
)
