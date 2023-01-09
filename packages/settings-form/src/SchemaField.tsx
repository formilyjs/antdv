import { createSchemaField } from '@formily/vue'
import * as AntdvUI from '@formily/antdv'
import {
  ColorInput,
  CollapseItem,
  SizeInput,
  DisplayStyleSetter,
  BackgroundStyleSetter,
  BoxShadowStyleSetter,
  FontStyleSetter,
  BoxStyleSetter,
  BorderRadiusStyleSetter,
  BorderStyleSetter,
  ValueInput,
} from './components'

// Types
import type { SchemaVueComponents } from '@formily/vue'

const SchemaFields = createSchemaField({
  components: {
    CollapseItem,
    ColorInput,
    ...(AntdvUI as SchemaVueComponents),
    SizeInput,
    DisplayStyleSetter,
    BackgroundStyleSetter,
    BoxShadowStyleSetter,
    FontStyleSetter,
    BoxStyleSetter,
    BorderRadiusStyleSetter,
    BorderStyleSetter,
    ValueInput,
  },
})

export const SchemaField = SchemaFields.SchemaField
