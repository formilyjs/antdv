// import { Space, Typography, Divider, TypographyProps } from 'antd'
import { observer } from '@formily/reactive-vue'
import { Space } from '@formily/antdv'
import { Button } from 'ant-design-vue'
import cls from 'classnames'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { defineComponent } from 'vue-demi'
import { usePrefix, useTreeNode, useSelected } from '../../hooks'
import { IconWidget } from '../IconWidget'
import { TextWidget } from '../TextWidget'
import './styles.less'
import type { VNode } from 'vue-demi'

export interface INodeActionsWidgetProps {
  activeShown?: boolean
}

export interface INodeActionsWidgetActionProps {
  title: VNode
  icon?: VNode
}

const NodeActionsWidgetComponent = observer(
  defineComponent<INodeActionsWidgetProps>({
    props: ['activeShown'],
    setup(props, { slots }) {
      const nodeRef = useTreeNode()
      const prefixRef = usePrefix('node-actions')
      const selectedRef = useSelected()
      return () => {
        if (
          selectedRef.value.indexOf(nodeRef.value.id) === -1 &&
          props.activeShown
        )
          return null
        return (
          <div class={cls(prefixRef.value)}>
            <div class={prefixRef.value + '-content'}>
              <Space
              // split="|"
              >
                {slots.default?.()}
              </Space>
            </div>
          </div>
        )
      }
    },
  })
)

const ActionComponent = defineComponent<INodeActionsWidgetActionProps>({
  props: ['icon', 'title'],
  setup(props, { attrs, emit }) {
    const prefixRef = usePrefix('node-actions-item')
    return () => {
      return (
        <Button
          attrs={attrs}
          type="text"
          class={cls(prefixRef.value)}
          data-click-stop-propagation="true"
          onClick={() => {
            emit('click')
          }}
        >
          <span class={prefixRef.value + '-text'}>
            <IconWidget infer={props.icon} />
            <TextWidget>{props.title}</TextWidget>
          </span>
        </Button>
      )
    }
  },
})
export const NodeActionsWidget = composeExport(NodeActionsWidgetComponent, {
  Action: ActionComponent,
})
