import { DatePicker as FormilyDatePicker } from '@formily/antdv'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const DatePicker = composeExport(FormilyDatePicker, {
  Behavior: createBehavior({
    name: 'DatePicker',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'DatePicker',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.DatePicker),
    },
    designerLocales: AllLocales.DatePicker,
  }),
  Resource: createResource({
    icon: 'DatePickerSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'DatePicker',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
        },
      },
    ],
  }),
})
