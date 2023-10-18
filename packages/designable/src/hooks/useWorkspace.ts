import type { Workspace } from '@pind/designable-core'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { WorkspaceSymbol, useContext } from '../context'
import { useDesigner } from './useDesigner'

export const useWorkspace = (id?: Ref<string | undefined>): Ref<Workspace> => {
  const designer = useDesigner()
  const workspaceRef = ref()
  const workspaceId = computed(() => id?.value || useContext(WorkspaceSymbol)?.value.id)
  if (workspaceId.value) {
    workspaceRef.value = designer.value.workbench.findWorkspaceById(workspaceId.value)
  }
  if (window['__DESIGNER_WORKSPACE__']) {
    workspaceRef.value = window['__DESIGNER_WORKSPACE__']
  }
  workspaceRef.value = designer.value.workbench.currentWorkspace
  return workspaceRef
}
