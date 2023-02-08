import { defineComponent } from 'vue-demi'
import { useDesigner, usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'

import type { TreeNode } from '@designable/core'

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
        attrs: {
          [designerRef.value.props.nodeTranslateAttrName!]: value,
        },
        class: {
          [prefixRef.value]: true,
          [value]: true,
        },
      })

      const handlerProps = createHandlerProps('translate')
      return (
        <div attrs={handlerProps.attrs} class={handlerProps.class}>
          <IconWidget infer="FreeMove" />
        </div>
      )
    }
  },
})
