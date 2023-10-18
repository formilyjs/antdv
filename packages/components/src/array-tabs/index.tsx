import type { ArrayField } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { isFn } from '@formily/shared'
import { RecursionField, useField, useFieldSchema } from '@formily/vue'
import type { TabsProps } from 'ant-design-vue'
import { Badge, Tabs } from 'ant-design-vue'
import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import { usePrefixCls } from '../__builtins__'

export interface ArrayTabsProps extends TabsProps {
  renderTitle?: (record: any, records: any[], index: number) => any
}

export const ArrayTabs = observer(
  defineComponent({
    name: 'ArrayTabs',
    props: {
      activeKey: {
        type: String
      },
      renderTitle: {
        type: Function as PropType<(...args: any[]) => any>
      }
    },
    setup(props, { attrs }) {
      const fieldRef = useField<ArrayField>()
      const schemaRef = useFieldSchema()

      const prefixCls = usePrefixCls('formily-array-tabs', attrs.prefixCls as string)
      const activeKey = ref('tab-0')

      watch(
        () => props.activeKey,
        (val) => {
          if (val) {
            activeKey.value = val
          }
        },
        {
          immediate: true
        }
      )

      return () => {
        const field = fieldRef.value
        const schema = schemaRef.value
        const value = Array.isArray(field.value) ? field.value.slice() : []
        const dataSource = value?.length ? value : [{}]

        const onEdit = (targetKey: any, type: 'add' | 'remove') => {
          if (type == 'add') {
            const id = dataSource.length
            if (field?.value?.length) {
              field.push(null)
            } else {
              field.push(null, null)
            }
            activeKey.value = `tab-${id}`
          } else if (type == 'remove') {
            const index = targetKey.match(/-(\d+)/)?.[1]
            field.remove(Number(index))
            if (activeKey.value === targetKey) {
              activeKey.value = `tab-${index - 1}`
            }
          }
        }

        const badgedTab = (index: number) => {
          const renderTitle = props.renderTitle
          const tab = isFn(renderTitle)
            ? renderTitle(dataSource[index], dataSource, index)
            : `${field.title || 'Untitled'} ${index + 1}`
          const path = field.address.concat(index)
          const errors = field.form.queryFeedbacks({
            type: 'error',
            address: `${path}.**`
          })
          if (errors.length) {
            return (
              <Badge class={`${prefixCls}-errors-badge`} count={errors.length}>
                {tab}
              </Badge>
            )
          }
          return tab
        }

        const renderItems = () =>
          dataSource?.map((item, index) => {
            const items = Array.isArray(schema.items) ? schema.items[index] : schema.items
            const key = `tab-${index}`
            return (
              <Tabs.TabPane key={key} closable={index !== 0} tab={badgedTab(index)}>
                <RecursionField schema={items} name={index}></RecursionField>
              </Tabs.TabPane>
            )
          })

        return (
          <Tabs
            type="editable-card"
            {...attrs}
            activeKey={activeKey.value}
            onChange={(key) => {
              activeKey.value = key as string
            }}
            onEdit={(key, action) => {
              onEdit(key, action)
            }}
          >
            {renderItems()}
          </Tabs>
        )
      }
    }
  })
)

export default ArrayTabs
