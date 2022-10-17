import { observer } from '@formily/reactive-vue'
import { FragmentComponent as Fragment } from '@formily/vue'
import { defineComponent } from 'vue-demi'

const NodeTitleWidgetComponent = defineComponent({
  name: 'DnNodeTitleWidget',
  props: ['node'],
  setup(props) {
    const takeNode = () => {
      const node = props.node
      if (node.componentName === '$$ResourceNode$$') {
        return node.children[0]
      }
      return node
    }
    return () => {
      const node = takeNode()
      return (
        <Fragment>{node.getMessage('title') || node.componentName}</Fragment>
      )
    }
  },
})
export const NodeTitleWidget = observer(NodeTitleWidgetComponent)
