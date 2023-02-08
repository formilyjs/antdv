import ActionsWidget from './actions-widget'
import SchemaEditorWidget from './schema-editor-widget'
import PreviewWidget from './preview-widget'
import LogoWidget from './logo-widget'

import type { VueConstructor } from 'vue'

export default function install(
  vue: VueConstructor,
  // eslint-disable-next-line
  options: Record<any, any>
) {
  vue.component('ActionsWidget', ActionsWidget)
  vue.component('SchemaEditorWidget', SchemaEditorWidget)
  vue.component('PreviewWidget', PreviewWidget)
  vue.component('LogoWidget', LogoWidget)
}
