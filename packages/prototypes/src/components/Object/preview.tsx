import { createBehavior, createResource } from '@designable/core'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createFieldSchema } from '../Field'
import { Container } from '../../common/Container'
import { AllLocales } from '../../locales'

export const ObjectContainer = composeExport(Container, {
  Behavior: createBehavior({
    name: 'Object',
    extends: ['Field'],
    selector: (node) => node.props.type === 'object',
    designerProps: {
      droppable: true,
      propsSchema: createFieldSchema(),
    },
    designerLocales: AllLocales.ObjectLocale,
  }),
  Resource: createResource({
    icon: 'ObjectSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'object',
        },
      },
    ],
  }),
})
