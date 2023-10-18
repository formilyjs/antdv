import { isValid } from '@pind/designable-shared'
import { FragmentComponent } from '@formily/vue'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import type { VNode } from 'vue'
import { defineComponent, ref, unref, watch } from 'vue'
import { usePrefix } from '../hooks'
import { IconWidget, TextWidget } from '../widgets'

export interface ICompositePanelProps {
  direction?: 'left' | 'right'
  showNavTitle?: boolean
  defaultOpen?: boolean
  defaultPinning?: boolean
  defaultActiveKey?: number
  activeKey?: number | string
  onChange?: (activeKey: number | string) => void
}

export interface ICompositePanelItemProps {
  shape?: 'tab' | 'button' | 'link'
  title?: VNode
  icon?: VNode
  key?: number | string
  href?: string
  // React.MouseEvent<HTMLDivElement, MouseEvent>
  onClick?: (e: MouseEvent) => void
  extra?: VNode
}

const parseItems = (children: VNode[]): Array<any> => {
  const items: any[] = []
  children.forEach((item, index) => {
    items.push({
      key: item.key ?? index,
      ...item?.props,
      children: item.children
    })
  })
  return items
}

const findItem = (items: any[], key: string | number) => {
  for (let index = 0; index < items.length; index++) {
    const item = items[index]
    if (key === index) return item
    if (key === item.key) return item
  }
}

const getDefaultKey = (children: VNode[]) => {
  const items = parseItems(children)
  return items?.[0]?.key
}

export const CompositePanelComponent = defineComponent({
  name: 'DnCompositePanel',
  props: {
    activeKey: [Number, String],
    defaultActiveKey: Number,
    defaultPinning: Boolean,
    showNavTitle: Boolean,
    defaultOpen: { type: Boolean, default: true },
    direction: String,
    onChange: Function
  },
  setup(props, { slots }) {
    const prefixRef = usePrefix('composite-panel')

    const activeKey = ref(props.defaultActiveKey ?? getDefaultKey(slots.default()))

    // 获取所有子组件
    const items = parseItems(slots.default())
    const pinning = ref(props.defaultPinning ?? false)
    const visible = ref(props.defaultOpen ?? true)

    watch(
      () => props.activeKey,
      () => {
        if (isValid(props.activeKey)) {
          if (props.activeKey !== activeKey.value) {
            activeKey.value = props.activeKey
          }
        }
      },
      { immediate: true }
    )

    const renderContent = () => {
      const prefix = unref(prefixRef)
      const currentItem = findItem(items, unref(activeKey))

      const content = currentItem?.children // 估计不对
      if (!unref(visible) || !content) return

      return (
        <div
          class={[
            prefix + '-tabs-content',
            {
              pinning: pinning.value
            }
          ]}
        >
          <div class={prefix + '-tabs-header'}>
            <div class={prefix + '-tabs-header-title'}>
              <TextWidget>{currentItem.title}</TextWidget>
            </div>
            <div class={prefix + '-tabs-header-actions'}>
              <div class={prefix + '-tabs-header-extra'}>{currentItem?.extra}</div>
              {!pinning.value && (
                <IconWidget
                  class={prefix + '-tabs-header-pin'}
                  infer="PushPinOutlined"
                  onClick={() => {
                    pinning.value = !pinning.value
                  }}
                />
              )}
              {pinning.value && (
                <IconWidget
                  class={prefix + '-tabs-header-pin-filled'}
                  infer="PushPinFilled"
                  onClick={() => {
                    pinning.value = !pinning.value
                  }}
                />
              )}
              <IconWidget
                class={prefix + '-tabs-header-close'}
                infer="Close"
                onClick={() => {
                  visible.value = false
                }}
              />
            </div>
          </div>
          <div class={prefix + '-tabs-body'}>{content.default?.()}</div>
        </div>
      )
    }

    return () => {
      const prefix = unref(prefixRef)
      return (
        <div
          class={[
            prefix,
            {
              [`direction-${props.direction}`]: !!props.direction
            }
          ]}
        >
          <div class={prefix + '-tabs'}>
            {items.map((item, index) => {
              const takeTab = () => {
                if (item.href) {
                  return <a href={item.href}>{item.icon}</a>
                }
                return (
                  <IconWidget
                    tooltip={
                      props.showNavTitle
                        ? null
                        : {
                            title: <TextWidget>{item.title}</TextWidget>,
                            placement: props.direction === 'right' ? 'left' : 'right'
                          }
                    }
                    infer={item.icon}
                  />
                )
              }
              const shape = item.shape ?? 'tab'
              const Comp = shape === 'link' ? 'a' : 'div'
              return (
                <Comp
                  key={index}
                  href={item.href}
                  class={[
                    prefix + '-tabs-pane',
                    {
                      active: unref(activeKey) === item.key
                    }
                  ]}
                  onClick={(e: MouseEvent) => {
                    if (shape === 'tab') {
                      if (unref(activeKey) === item.key) {
                        visible.value = !visible.value
                      } else {
                        visible.value = true
                      }
                      if (!props?.activeKey || !props?.onChange) activeKey.value = item.key
                    }
                    item.onClick?.(e)
                    props.onChange?.(item.key as string)
                  }}
                >
                  {takeTab()}
                  {props.showNavTitle && item.title ? (
                    <div class={prefix + '-tabs-pane-title'}>
                      <TextWidget>{item.title}</TextWidget>
                    </div>
                  ) : null}
                </Comp>
              )
            })}
          </div>
          {renderContent()}
        </div>
      )
    }
  }
})

/**
 *  shape?: 'tab' | 'button' | 'link'
    title?: VNode
    icon?: VNode
    key?: number | string
    href?: string
    // React.MouseEvent<HTMLDivElement, MouseEvent>
    onClick?: (e: any) => void
    extra?: VNode
 */
const Item = defineComponent({
  name: 'DnCompositePanelItem',
  // key is reserved
  props: ['shape', 'title', 'icon', 'href', 'extra', 'onClick'],
  setup() {
    return FragmentComponent
  }
})

export const CompositePanel = composeExport(CompositePanelComponent, {
  Item: composeExport(Item, { type: Item })
})
