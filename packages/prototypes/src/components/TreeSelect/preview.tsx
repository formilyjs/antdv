import { Select as FormilyTreeSelect } from '@formily/antdv'
import { createBehavior, createResource } from '@designable/core'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import type { DnFC } from '@formily/antdv-designable'
import type { VueComponent } from '@formily/vue'

export const TreeSelect: DnFC<VueComponent<typeof FormilyTreeSelect>> =
  composeExport(FormilyTreeSelect, {
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
