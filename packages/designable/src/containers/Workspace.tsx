import { FragmentComponent, h } from '@formily/vue'
import { computed, defineComponent, provide, unref } from 'vue'
import { WorkspaceSymbol } from '../context'
import { useDesigner } from '../hooks'

export interface IWorkspaceProps {
  id?: string
  title?: string
  description?: string
}

export const Workspace = defineComponent({
  name: 'DnWorkspace',
  props: {
    id: String,
    title: String,
    description: String
  },
  setup(props, { slots }) {
    const oldId = computed(() => {
      return props.id || 'index'
    })
    const designerRef = useDesigner()
    // memo [id, designer]
    const workspace = computed(() => {
      const designer = unref(designerRef)
      if (!designer) return
      if (oldId.value && oldId.value !== props.id) {
        const old = designer.workbench.findWorkspaceById(oldId.value)
        if (old) old.viewport.detachEvents()
      }
      const workspace = {
        id: props.id || 'index',
        title: props.title,
        description: props.description
      }
      designer.workbench.ensureWorkspace(workspace)

      return workspace
    })

    provide(WorkspaceSymbol, workspace)

    return () => h(FragmentComponent, {}, slots)
  }
})
