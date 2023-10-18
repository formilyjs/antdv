import { Space as AntdSpace } from 'ant-design-vue'
import type { VNode } from 'vue'
import { defineComponent } from 'vue'
import { usePrefixCls } from '../__builtins__'
import { useFormLayout } from '../form-layout'

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24
}

export const Space = defineComponent({
  name: 'Space',
  props: ['size', 'align', 'direction'],
  setup(props, { attrs, slots }) {
    const layout = useFormLayout()

    return () => {
      const { align, size = layout.value?.spaceGap ?? 'small', direction = 'horizontal' } = props
      const prefixCls = usePrefixCls('space', attrs.prefixCls as string)
      const children = slots.default?.()
      let items = []
      if (Array.isArray(children)) {
        if (children.length === 1) {
          if ((children[0]['tag'] as string)?.endsWith('Fragment')) {
            // Fragment hack
            items = (children[0]['componentOptions'] as { children: VNode[] })?.children
          } else {
            items = children.filter((child) => !!child.children)
          }
        } else {
          items = children.filter((child) => !!child.children)
        }
      }
      const len = items.length
      if (len === 0) return null

      const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align

      const someSpaceClass = {
        [`${prefixCls}-align-${mergedAlign}`]: mergedAlign
      }

      const itemClassName = `${prefixCls}-item`
      const marginDirection = 'marginRight' // directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';

      const renderItems = () =>
        items.map((child, i) => {
          return (
            <div
              class={itemClassName}
              key={`${itemClassName}-${i}`}
              style={
                i === len - 1
                  ? {}
                  : {
                      [direction === 'vertical' ? 'marginBottom' : marginDirection]:
                        typeof size === 'string' ? `${spaceSize[size]}px` : `${size}px`
                    }
              }
            >
              {child}
            </div>
          )
        })

      return (
        <AntdSpace class={someSpaceClass} direction={direction} align={mergedAlign}>
          {renderItems()}
        </AntdSpace>
      )
    }
  }
})

export default Space
