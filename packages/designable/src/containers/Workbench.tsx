import { observer } from '@formily/reactive-vue'
import { defineComponent } from 'vue-demi'
import { useWorkbench } from '../hooks'
import { Workspace } from './Workspace'

const WrokbenchComponent = defineComponent({
  name: 'DnWrokbench',
  setup(props, { slots }) {
    const workbench = useWorkbench()

    return () => (
      <Workspace id={workbench.value.currentWorkspace?.id}>
        {slots.default?.()}
      </Workspace>
    )
  },
})
export const Workbench = observer(WrokbenchComponent)
