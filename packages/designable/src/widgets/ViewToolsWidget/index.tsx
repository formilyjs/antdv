import { defineComponent } from 'vue-demi'
import { Button } from 'ant-design-vue'
import { observer } from '@formily/reactive-vue'
import { IconWidget } from '../IconWidget'
import { usePrefix, useWorkbench } from '../../hooks'

import type { PropType } from 'vue-demi'
import type { WorkbenchTypes } from '@designable/core'

export interface IViewToolsWidget {
  use?: WorkbenchTypes[]
}

const VireToolsWidgetComponent = defineComponent({
  name: 'DnVireToolsWidget',
  props: {
    use: {
      type: Array as PropType<WorkbenchTypes[]>,
      default: () => ['DESIGNABLE', 'JSONTREE', 'PREVIEW'],
    },
  },
  setup(props) {
    const workbenchRef = useWorkbench()
    const prefixRef = usePrefix('view-tools')

    return () => (
      <Button.Group class={prefixRef.value}>
        {props.use.includes('DESIGNABLE') && (
          <Button
            disabled={workbenchRef.value?.type === 'DESIGNABLE'}
            onClick={() => {
              workbenchRef.value.type = 'DESIGNABLE'
            }}
            size="small"
          >
            <IconWidget infer="Design" />
          </Button>
        )}
        {props.use.includes('JSONTREE') && (
          <Button
            disabled={workbenchRef.value?.type === 'JSONTREE'}
            onClick={() => {
              workbenchRef.value.type = 'JSONTREE'
            }}
            size="small"
          >
            <IconWidget infer="JSON" />
          </Button>
        )}
        {props.use.includes('MARKUP') && (
          <Button
            disabled={workbenchRef.value?.type === 'MARKUP'}
            onClick={() => {
              workbenchRef.value.type = 'MARKUP'
            }}
            size="small"
          >
            <IconWidget infer="Code" />
          </Button>
        )}
        {props.use.includes('PREVIEW') && (
          <Button
            disabled={workbenchRef.value?.type === 'PREVIEW'}
            onClick={() => {
              workbenchRef.value.type = 'PREVIEW'
            }}
            size="small"
          >
            <IconWidget infer="Play" />
          </Button>
        )}
      </Button.Group>
    )
  },
})

export const ViewToolsWidget = observer(VireToolsWidgetComponent)
