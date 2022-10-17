import { ref, computed } from 'vue-demi'
import { WorkspaceSymbol, useContext } from '../context'
import { useDesigner } from './useDesigner'
import type { Ref } from 'vue-demi'
import type { Workspace } from '@designable/core'

export const useWorkspace = (id?: string): Ref<Workspace> => {
  const designer = useDesigner()
  const workspaceRef = ref()
  const workspaceId = computed(
    () => id || useContext(WorkspaceSymbol)?.value.id
  )
  if (workspaceId) {
    workspaceRef.value = designer.value.workbench.findWorkspaceById(
      workspaceId.value
    )
  }
  if (window['__DESINGER_WORKSPACE__']) {
    workspaceRef.value = window['__DESINGER_WORKSPACE__']
  }
  workspaceRef.value = designer.value.workbench.currentWorkspace
  return workspaceRef
}
