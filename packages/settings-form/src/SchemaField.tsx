import { createSchemaField } from '@formily/vue'
import * as AntdvUI from '@formily/antdv'
import type { SchemaVueComponents } from '@formily/vue'
import {
  BackgroundStyleSetter,
  BorderRadiusStyleSetter,
  BorderStyleSetter,
  BoxShadowStyleSetter,
  BoxStyleSetter,
  CollapseItem,
  ColorInput,
  DisplayStyleSetter,
  FontStyleSetter,
  SizeInput,
  ValueInput
} from './components'

const SchemaFields = createSchemaField({
  components: {
    CollapseItem,
    ColorInput,
    ...(AntdvUI as unknown as SchemaVueComponents),
    SizeInput,
    DisplayStyleSetter,
    BackgroundStyleSetter,
    BoxShadowStyleSetter,
    FontStyleSetter,
    BoxStyleSetter,
    BorderRadiusStyleSetter,
    BorderStyleSetter,
    ValueInput
  }
})

export const SchemaField = SchemaFields.SchemaField
