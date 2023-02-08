import { defineComponent, unref } from 'vue-demi'
import { FormItem } from '@formily/antdv'
import { useField, FragmentComponent } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { observable } from '@formily/reactive'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { IconWidget, usePrefix } from '@formily/antdv-designable'
import './styles.less'

import type { PropType } from 'vue-demi'

const ExpandedMap = new Map<string, boolean>()

export type FoldItemProps = {
  label: PropType<string>
}

const FoldItemComponent = observer(
  defineComponent({
    name: 'DnFoldItem',
    props: ['label'],
    slots: ['base', 'extra'],
    setup(props, { attrs, slots }) {
      const fieldRef = useField()
      const expand = observable.ref(
        ExpandedMap.get(fieldRef.value.address.toString())
      )
      const prefixRef = usePrefix('fold-item')

      return () => {
        const field = unref(fieldRef)

        return (
          <div class={prefixRef.value}>
            <div
              class={prefixRef.value + '-base'}
              onClick={() => {
                expand.value = !expand.value
                ExpandedMap.set(field.address.toString(), expand.value)
              }}
            >
              <FormItem.BaseItem
                attrs={{
                  ...attrs,
                  label: (
                    <span
                      class={[
                        prefixRef.value + '-title',
                        {
                          expand: expand.value,
                        },
                      ]}
                    >
                      {slots.extra && <IconWidget infer="Expand" size={10} />}
                      {props.label}
                    </span>
                  ),
                }}
              >
                <div
                  style={{ width: '100%' }}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  {slots.base?.()}
                </div>
              </FormItem.BaseItem>
            </div>
            {expand.value && slots.extra && (
              <div class={prefixRef.value + '-extra'}>{slots.extra?.()}</div>
            )}
          </div>
        )
      }
    },
  })
)

export const FoldItem = composeExport(FoldItemComponent, {
  Base: composeExport(() => <FragmentComponent></FragmentComponent>, {
    displayName: 'FoldItem.Base',
  }),
  Extra: composeExport(() => <FragmentComponent></FragmentComponent>, {
    displayName: 'FoldItem.Extra',
  }),
})
