import type { TreeNode } from '@pind/designable-core'
import { FragmentComponent } from '@formily/vue'
import { defineComponent } from 'vue'
import { useDesigner, usePrefix } from '../../hooks'

export interface IResizeHandlerProps {
  node: TreeNode
}

export const ResizeHandler = defineComponent({
  name: 'DnResizeHandler',
  props: ['node'],
  setup(props) {
    const designerRef = useDesigner()
    const prefixRef = usePrefix('aux-node-resize-handler')

    return () => {
      const allowResize = props.node.allowResize()
      if (!allowResize) return null
      const allowX = allowResize.includes('x')
      const allowY = allowResize.includes('y')

      const createHandlerProps = (value: string) => {
        return {
          [designerRef.value.props.nodeResizeHandlerAttrName!]: value,
          class: {
            [prefixRef.value]: true,
            [value]: true
          }
        }
      }
      const handlerProps = {
        xStart: createHandlerProps('x-start'),
        xEnd: createHandlerProps('x-end'),
        yStart: createHandlerProps('y-start'),
        yEnd: createHandlerProps('y-end')
      }
      return (
        <FragmentComponent>
          {allowX && <div {...handlerProps.xStart}></div>}
          {allowX && <div {...handlerProps.xEnd}></div>}
          {allowY && <div {...handlerProps.yStart}></div>}
          {allowY && <div {...handlerProps.yEnd}></div>}
        </FragmentComponent>
      )
    }
  }
})
