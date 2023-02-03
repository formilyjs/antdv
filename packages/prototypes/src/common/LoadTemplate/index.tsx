import { defineComponent } from 'vue-demi'
import { NodeActionsWidget } from '@formily/antdv-designable'

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
  emits: ['click'],
  props: { actions: Array },
  setup(props: ILoadTemplateProps, { emit }) {
    return () => {
      return (
        <NodeActionsWidget>
          {props.actions?.map((action, key) => {
            return (
              <NodeActionsWidget.Action
                key={key}
                props={action}
                onClick={action.onClick}
              />
            )
          })}
        </NodeActionsWidget>
      )
    }
  },
})
