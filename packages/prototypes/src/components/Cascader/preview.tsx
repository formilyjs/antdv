import { Cascader as FormilyCascader } from '@formily/antdv'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const Cascader = composeExport(FormilyCascader, {
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
          enum: [
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                  children: [
                    {
                      value: 'xihu',
                      label: 'West Lake',
                    },
                  ],
                },
              ],
            },
            {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [
                {
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [
                    {
                      value: 'zhonghuamen',
                      label: 'Zhong Hua Men',
                    },
                  ],
                },
              ],
            },
          ],
          'x-decorator': 'FormItem',
          'x-component': 'Cascader',
        },
      },
    ],
  }),
})
