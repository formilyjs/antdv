import { observer } from '@formily/reactive-vue'
import { defineComponent } from 'vue-demi'
import { h as CreateElement } from '@formily/vue'
import { useWorkbench } from '../hooks'
import { Workspace } from './Workspace'

const WrokbenchComponent = defineComponent({
  setup(props, { slots }) {
    const workbench = useWorkbench()

    return () =>
      CreateElement(
        Workspace,
        { attrs: { id: workbench.value.currentWorkspace?.id } },
        slots
      )
  },
})
export const Workbench = observer(WrokbenchComponent)
