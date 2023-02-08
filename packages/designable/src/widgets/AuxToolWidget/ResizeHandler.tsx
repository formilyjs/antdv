import { defineComponent } from 'vue-demi'
import { FragmentComponent } from '@formily/vue'
import { useDesigner, usePrefix } from '../../hooks'

import type { TreeNode } from '@designable/core'

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
          attrs: {
            [designerRef.value.props.nodeResizeHandlerAttrName!]: value,
          },
          class: {
            [prefixRef.value]: true,
            [value]: true,
          },
        }
      }
      const handlerProps = {
        xStart: createHandlerProps('x-start'),
        xEnd: createHandlerProps('x-end'),
        yStart: createHandlerProps('y-start'),
        yEnd: createHandlerProps('y-end'),
      }
      return (
        <FragmentComponent>
          {allowX && (
            <div
              attrs={handlerProps.xStart.attrs}
              class={handlerProps.xStart.class}
            ></div>
          )}
          {allowX && (
            <div
              attrs={handlerProps.xEnd.attrs}
              class={handlerProps.xEnd.class}
            ></div>
          )}
          {allowY && (
            <div
              attrs={handlerProps.yStart.attrs}
              class={handlerProps.yStart.class}
            ></div>
          )}
          {allowY && (
            <div
              attrs={handlerProps.yEnd.attrs}
              class={handlerProps.yEnd.class}
            ></div>
          )}
          {/* {allowX && <div {...createHandler('left-center')}></div>}
                {allowX && <div {...createHandler('right-center')}></div>}
                {allowY && <div {...createHandler('center-top')}></div>}
                {allowY && <div {...createHandler('center-bottom')}></div>}
                {allowX && allowY && <div {...createHandler('left-top')}></div>}
                {allowY && allowY && <div {...createHandler('right-top')}></div>}
                {allowX && allowY && <div {...createHandler('left-bottom')}></div>}
                {allowY && allowY && <div {...createHandler('right-bottom')}></div>} */}
        </FragmentComponent>
      )
    }
  },
})
