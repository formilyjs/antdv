import type { TreeNode } from '@pind/designable-core'
import { defineComponent } from 'vue'
import { useDesigner, usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'

export interface ITranslateHandlerProps {
  node: TreeNode
}

export const TranslateHandler = defineComponent({
  name: 'DnTranslateHandler',
  props: ['node'],
  setup(props) {
    const designerRef = useDesigner()
    const prefixRef = usePrefix('aux-node-translate-handler')

    return () => {
      const allowTranslate = props.node.allowTranslate()
      if (!allowTranslate) return null

      const createHandlerProps = (value: string) => ({
        [designerRef.value.props.nodeTranslateAttrName!]: value,
        class: {
          [prefixRef.value]: true,
          [value]: true
        }
      })

      const handlerProps = createHandlerProps('translate')
      return (
        <div {...handlerProps}>
          <IconWidget infer="FreeMove" />
        </div>
      )
    }
  }
})
