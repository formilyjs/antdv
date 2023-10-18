import type { ArrayField } from '@formily/core'
import type { ISchema } from '@formily/json-schema'
import { observer } from '@formily/reactive-vue'
import { toArr } from '@formily/shared'
import { RecursionField, useField, useFieldSchema } from '@formily/vue'
import type { CollapsePanelProps, CollapseProps } from 'ant-design-vue'
import { Badge, Card, Collapse, Empty } from 'ant-design-vue'
import type { Ref } from 'vue'
import { defineComponent, ref, watchEffect } from 'vue'
import { composeExport, usePrefixCls } from '../__builtins__'
import { ArrayBase } from '../array-base'
import useStyle from './style'

export interface IArrayCollapseProps extends CollapseProps {
  defaultOpenPanelCount?: number
}

const isAdditionComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

const isIndexComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Index') > -1
}

const isRemoveComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Remove') > -1
}

const isMoveUpComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveUp') > -1
}

const isMoveDownComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveDown') > -1
}

const isOperationComponent = (schema: ISchema) => {
  return (
    isAdditionComponent(schema) ||
    isRemoveComponent(schema) ||
    isMoveDownComponent(schema) ||
    isMoveUpComponent(schema)
  )
}
const range = (count: number) => Array.from({ length: count }).map((_, i) => i)

const takeDefaultActiveKeys = (dataSourceLength: number, defaultOpenPanelCount: number) => {
  if (dataSourceLength < defaultOpenPanelCount) return range(dataSourceLength)
  return range(defaultOpenPanelCount)
}

const insertActiveKeys = (activeKeys: number[], index: number) => {
  if (activeKeys.length <= index) return activeKeys.concat(index)
  return activeKeys.reduce((buf, key) => {
    if (key < index) return buf.concat(key)
    if (key === index) return buf.concat([key, key + 1])
    return buf.concat(key + 1)
  }, [])
}

const ArrayCollapseInner = observer(
  defineComponent({
    name: 'ArrayCollapse',
    props: {
      defaultOpenPanelCount: {
        type: Number,
        default: 5
      }
    },
    emits: ['change'],
    setup(props, { attrs }) {
      const fieldRef = useField<ArrayField>()
      const schemaRef = useFieldSchema()

      const prefixCls = usePrefixCls('formily-array-collapse', attrs.prefixCls as string)
      const activeKeys: Ref<number[]> = ref([])
      const [wrapSSR, hashId] = useStyle(prefixCls)

      watchEffect(() => {
        const field = fieldRef.value
        const dataSource = Array.isArray(field.value) ? field.value.slice() : []
        if (!field.modified && dataSource.length) {
          activeKeys.value = takeDefaultActiveKeys(dataSource.length, props.defaultOpenPanelCount)
        }
      })

      const { keyMap } = ArrayBase.useKey(schemaRef.value)

      return () => {
        const field = fieldRef.value
        const schema = schemaRef.value
        const dataSource = Array.isArray(field.value) ? field.value.slice() : []
        if (!schema) throw new Error('can not found schema object')

        const renderAddition = () => {
          return schema.reduceProperties((addition, schema, key) => {
            if (isAdditionComponent(schema)) {
              return <RecursionField schema={schema} name={key}></RecursionField>
            }
            return addition
          }, null)
        }

        const renderEmpty = () => {
          if (dataSource?.length) return
          return (
            <Card class={`${prefixCls}-item`}>
              <Empty />
            </Card>
          )
        }

        const renderItems = () => {
          if (!dataSource.length) {
            return null
          }

          const items = dataSource?.map((item, index) => {
            const items = Array.isArray(schema.items)
              ? schema.items[index] || schema.items[0]
              : schema.items
            const panelProps = field.query(`${field.address}.${index}`).get('componentProps')
            const props: CollapsePanelProps = items['x-component-props']
            const headerTitle = panelProps?.header || props.header || field.title
            const path = field.address.concat(index)
            const errors = field.form.queryFeedbacks({
              type: 'error',
              address: `${path}.**`
            })

            const header = (
              <ArrayBase.Item index={index} record={item}>
                <RecursionField
                  schema={items}
                  name={index}
                  filterProperties={(schema: ISchema) => {
                    if (!isIndexComponent(schema)) return false
                    return true
                  }}
                  onlyRenderProperties
                ></RecursionField>
                {errors.length ? (
                  <Badge class={`${prefixCls}-errors-badge`} count={errors.length}>
                    {headerTitle}
                  </Badge>
                ) : (
                  headerTitle
                )}
              </ArrayBase.Item>
            )

            const extra = (
              <ArrayBase.Item index={index} record={item}>
                <RecursionField
                  schema={items}
                  name={index}
                  filterProperties={(schema: ISchema) => {
                    if (!isOperationComponent(schema)) return false
                    return true
                  }}
                  onlyRenderProperties
                ></RecursionField>
              </ArrayBase.Item>
            )

            const content = (
              <RecursionField
                schema={items}
                name={index}
                filterProperties={(schema: ISchema) => {
                  if (isIndexComponent(schema)) return false
                  if (isOperationComponent(schema)) return false
                  return true
                }}
              ></RecursionField>
            )

            const newProps = { ...props }
            const newPanelProps = panelProps ? { ...panelProps } : {}

            return (
              <Collapse.Panel
                {...newProps}
                {...newPanelProps}
                key={index}
                forceRender
                header={header}
                extra={extra}
              >
                <ArrayBase.Item index={index} record={item}>
                  {content}
                </ArrayBase.Item>
              </Collapse.Panel>
            )
          })

          return (
            <Collapse
              {...attrs}
              class={`${prefixCls}-item ${hashId.value}`}
              activeKey={activeKeys.value}
              onChange={(keys: number[]) => {
                activeKeys.value = toArr(keys).map(Number)
              }}
            >
              {items}
            </Collapse>
          )
        }

        return wrapSSR(
          <ArrayBase
            keyMap={keyMap}
            onAdd={(index: number) => {
              activeKeys.value = insertActiveKeys(activeKeys.value, index)
            }}
          >
            {renderEmpty()}
            {renderItems()}
            {renderAddition()}
          </ArrayBase>
        )
      }
    }
  })
)

const ArrayCollapsePanel = defineComponent<CollapsePanelProps>({
  name: 'ArrayCollapsePanel',
  setup() {
    return () => <>{null}</>
  }
})

export const ArrayCollapse = composeExport(ArrayCollapseInner, {
  CollapsePanel: ArrayCollapsePanel,
  Index: ArrayBase.Index,
  SortHandle: ArrayBase.SortHandle,
  Addition: ArrayBase.Addition,
  Remove: ArrayBase.Remove,
  MoveDown: ArrayBase.MoveDown,
  MoveUp: ArrayBase.MoveUp,
  useArray: ArrayBase.useArray,
  useIndex: ArrayBase.useIndex,
  useRecord: ArrayBase.useRecord
})

export default ArrayCollapse
