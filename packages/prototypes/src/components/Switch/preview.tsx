import { Switch as AntSwitch } from 'ant-design-vue'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const Switch = composeExport(AntSwitch, {
  Behavior: createBehavior({
    name: 'Switch',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Switch',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Switch),
    },
    designerLocales: AllLocales.Switch,
  }),
  Resource: createResource({
    icon: 'SwitchSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'boolean',
          title: 'Switch',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
        },
      },
    ],
  }),
})
