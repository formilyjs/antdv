import { NodeActionsWidget } from '@formily/antdv-designable'
import { defineComponent } from 'vue-demi'
import type { VNode, CSSProperties } from '@vue/runtime-dom'
import type { VueComponent } from '@formily/vue'

export interface ITemplateAction {
  title: VNode
  tooltip?: VNode
  icon?: string | VNode
  onClick: () => void
}

export interface ILoadTemplateProps {
  className?: string
  style?: CSSProperties
  actions?: ITemplateAction[]
}

export const LoadTemplate: VueComponent<ILoadTemplateProps> = defineComponent({
  props: { actions: Array },
  setup(props: ILoadTemplateProps, { attrs, slots }) {
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
