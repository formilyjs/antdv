import { NodeActionsWidget } from '@formily/antdv-designable'
import { defineComponent } from 'vue-demi'
import type { VNode } from 'vue'

export interface ITemplateAction {
  title: VNode
  tooltip?: VNode
  icon?: string | VNode
  onClick: () => void
}

export interface ILoadTemplateProps {
  className?: string
  style?: Record<string, any>
  actions?: ITemplateAction[]
}

export const LoadTemplate = defineComponent({
  props: { actions: Array },
  setup(props: ILoadTemplateProps) {
    return () => {
      return (
        <NodeActionsWidget>
          {props.actions?.map((action, key) => {
            return (
              <NodeActionsWidget.Action
                props={action}
                key={key}
                onClick={action.onClick}
              />
            )
          })}
        </NodeActionsWidget>
      )
    }
  },
})
