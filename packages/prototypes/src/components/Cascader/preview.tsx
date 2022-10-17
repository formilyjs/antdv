import { Cascader as FormilyCascader } from '@formily/antdv'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import type { DnFC } from '@formily/antdv-designable'
import type { VueComponent } from '@formily/vue'

export const Cascader: DnFC<VueComponent<typeof FormilyCascader>> =
  composeExport(FormilyCascader, {
    Behavior: createBehavior({
      name: 'Cascader',
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === 'Cascader',
      designerProps: {
        propsSchema: createFieldSchema(AllSchemas.Cascader),
      },
      designerLocales: AllLocales.Cascader,
    }),
    Resource: createResource({
      icon: 'CascaderSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            title: 'Cascader',
            'x-decorator': 'FormItem',
            'x-component': 'Cascader',
          },
        },
      ],
    }),
  })
