import type { TreeNode } from '@pind/designable-core'
import { observer } from '@formily/reactive-vue'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { Button } from 'ant-design-vue'
import type { PropType, Ref } from 'vue'
import { defineComponent, onBeforeUnmount, onMounted, ref, unref } from 'vue'
import { useHover, usePrefix, useSelection } from '../../hooks'
import { IconWidget } from '../IconWidget'
import { NodeTitleWidget } from '../NodeTitleWidget'

const useMouseHover = <T extends Ref<HTMLElement>>(
  refInstance: T,
  enter?: () => void,
  leave?: () => void
) => {
  const unmounted = ref(false)
  let timer = null

  const onMouseOver = (e: MouseEvent) => {
    const target: HTMLElement = e.target as any
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (unmounted.value) return
      const result = unref(refInstance) as any
      if (result?.contains(target)) {
        enter && enter()
      } else {
        leave && leave()
      }
    }, 100)
  }

  onMounted(() => {
    document.addEventListener('mouseover', onMouseOver)
  })

  onBeforeUnmount(() => {
    unmounted.value = true
    document.removeEventListener('mouseover', onMouseOver)
  })
}

export interface ISelectorProps {
  node: TreeNode
}

const SelectorComponent = observer(
  defineComponent({
    name: 'DnSelector',
    props: { node: { type: Object as PropType<TreeNode> } },
    setup(props) {
      const expand = ref(false)
      const setExpand = (value) => {
        expand.value = value
      }

      const hoverRef = useHover()
      const refInstance = ref<HTMLDivElement>()
      const selectionRef = useSelection()
      const prefixRef = usePrefix('aux-selector')

      useMouseHover(
        refInstance,
        () => {
          setExpand(true)
        },
        () => {
          setExpand(false)
        }
      )

      return () => {
        const node = props.node
        const renderIcon = (node: TreeNode) => {
          const icon = node.designerProps.icon
          if (icon) {
            return <IconWidget infer={icon} />
          }
          if (node === node.root) {
            return <IconWidget infer="Page" />
          } else if (node.designerProps?.droppable) {
            return <IconWidget infer="Container" />
          }
          return <IconWidget infer="Component" />
        }

        const parents = node.getParents()

        const renderMenu = () => {
          return (
            <div
              class={prefixRef.value + '-menu'}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0
              }}
            >
              {parents.slice(0, 4).map((parent) => {
                return (
                  <Button
                    key={parent.id}
                    type="primary"
                    vOn:click_prevent_stop={() => {
                      selectionRef.value.select(parent.id)
                    }}
                    vOn:mouseenter_native={() => {
                      hoverRef.value.setHover(parent)
                    }}
                  >
                    {renderIcon(parent)}
                    <span style={{ transform: 'scale(0.85)', marginLeft: '2px' }}>
                      <NodeTitleWidget node={parent} />
                    </span>
                  </Button>
                )
              })}
            </div>
          )
        }

        return (
          <div ref={refInstance} class={prefixRef.value}>
            <Button
              class={prefixRef.value + '-title'}
              type="primary"
              vOn:mouseenter_native={() => {
                hoverRef.value.setHover(node)
              }}
            >
              {renderIcon(node)}
              <span>
                <NodeTitleWidget node={node} />
              </span>
            </Button>
            {expand.value && renderMenu()}
          </div>
        )
      }
    }
  })
)

export const Selector = composeExport(SelectorComponent, {
  displayName: 'Selector'
})
