import type { VueConstructor } from 'vue'
import ActionsWidget from './actions-widget'
import LogoWidget from './logo-widget'
import PreviewWidget from './preview-widget'
import SchemaEditorWidget from './schema-editor-widget'

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
