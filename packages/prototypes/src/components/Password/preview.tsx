import { Password as FormilyPassword } from '@formily/antdv'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { merge } from '@formily/shared'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const Password = composeExport(FormilyPassword, {
  Behavior: createBehavior({
    name: 'Password',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Password',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Input),
    },
    designerLocales: merge(AllLocales.Input, {
      'zh-CN': {
        title: '密码输入',
      },
      'en-US': {
        title: 'PassWord',
      },
    }),
  }),
  Resource: createResource({
    icon: 'PasswordSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          title: 'Password',
          'x-decorator': 'FormItem',
          'x-component': 'Password',
        },
      },
    ],
  }),
})
