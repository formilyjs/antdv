import { createSchemaField } from '@formily/vue'
import * as ElementUI from '@formily/antdv'
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

const SchemaFields = createSchemaField({
  // @ts-ignore TODO: type error
  components: {
    CollapseItem,
    ColorInput,
    ...ElementUI,
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
