import { createBehavior, createResource } from '@pind/designable-core'
import { Input as FormilyInput } from '@formily/antdv'
import type { DnFC } from '@formily/antdv-designable'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createFieldSchema } from '../Field'

export const Input: DnFC<Vue.Component<any, any, any, typeof FormilyInput>> = composeExport(
  FormilyInput,
  {
    Behavior: createBehavior(
      {
        name: 'Input',
        extends: ['Field'],
        selector: (node) => node.props['x-component'] === 'Input',
        designerProps: {
          propsSchema: createFieldSchema(AllSchemas.Input)
        },
        designerLocales: AllLocales.Input
      },
      {
        name: 'Input.TextArea',
        extends: ['Field'],
        selector: (node) => node.props['x-component'] === 'Input.TextArea',
        designerProps: {
          propsSchema: createFieldSchema(AllSchemas.Input.TextArea)
        },
        designerLocales: AllLocales.TextArea
      }
    ),
    Resource: createResource(
      {
        icon: 'InputSource',
        elements: [
          {
            componentName: 'Field',
            props: {
              type: 'string',
              title: 'Input',
              'x-decorator': 'FormItem',
              'x-component': 'Input'
            }
          }
        ]
      },
      {
        icon: 'TextAreaSource',
        elements: [
          {
            componentName: 'Field',
            props: {
              type: 'string',
              title: 'TextArea',
              'x-decorator': 'FormItem',
              'x-component': 'Input.TextArea'
            }
          }
        ]
      }
    )
  }
)
