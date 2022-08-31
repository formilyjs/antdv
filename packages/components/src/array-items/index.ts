import { defineComponent } from 'vue-demi'
import type { ArrayField } from '@formily/core'
import { useField, useFieldSchema, RecursionField, h } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import type { ISchema } from '@formily/json-schema'
import { stylePrefix } from '../__builtins__/configs'
import { ArrayBase } from '../array-base'
import { SlickList, SlickItem } from 'vue-slicksort'
import { composeExport } from '../__builtins__/shared'

const isAdditionComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

export interface IArrayItemsItemProps {
  type?: 'card' | 'divide'
}

const ArrayItemsInner = observer(
  defineComponent({
    name: 'ArrayItems',
    setup() {
      const fieldRef = useField<ArrayField>()
      const schemaRef = useFieldSchema()

      const prefixCls = `${stylePrefix}-array-items`
      const { getKey, keyMap } = ArrayBase.useKey(schemaRef.value)

      return () => {
        const field = fieldRef.value
        const schema = schemaRef.value
        const dataSource = Array.isArray(field.value) ? field.value.slice() : []
        if (!schema) throw new Error('can not found schema object')

        const renderItems = () => {
          const items = dataSource?.map((item, index) => {
            const items = Array.isArray(schema.items)
              ? schema.items[index] || schema.items[0]
              : schema.items
            const key = getKey(item, index)
            return h(
              ArrayBase.Item,
              {
                key,
                props: {
                  index,
                  record: item,
                },
              },
              {
                default: () =>
                  h(
                    SlickItem,
                    {
                      class: [`${prefixCls}-item-inner`],
                      props: {
                        index,
                      },
                      key,
                    },
                    {
                      default: () =>
                        h(
                          RecursionField,
                          {
                            props: {
                              schema: items,
                              name: index,
                            },
                          },
                          {}
                        ),
                    }
                  ),
              }
            )
          })

          return h(
            SlickList,
            {
              class: [`${prefixCls}-list`],
              props: {
                useDragHandle: true,
                lockAxis: 'y',
                helperClass: `${prefixCls}-sort-helper`,
                value: [],
              },
              on: {
                'sort-end': ({ oldIndex, newIndex }) => {
                  if (Array.isArray(keyMap)) {
                    keyMap.splice(newIndex, 0, keyMap.splice(oldIndex, 1)[0])
                  }
                  field.move(oldIndex, newIndex)
                },
              },
            },
            { default: () => items }
          )
        }

        const renderAddition = () => {
          return schema.reduceProperties((addition, schema, key) => {
            if (isAdditionComponent(schema)) {
              return h(
                RecursionField,
                {
                  props: {
                    schema,
                    name: key,
                  },
                },
                {}
              )
            }
            return addition
          }, null)
        }

        return h(
          ArrayBase,
          {
            props: {
              keyMap,
            },
          },
          {
            default: () =>
              h(
                'div',
                {
                  class: [prefixCls],
                  on: {
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    change: () => {},
                  },
                },
                {
                  default: () => [renderItems(), renderAddition()],
                }
              ),
          }
        )
      }
    },
  })
)

const ArrayItemsItem = defineComponent<IArrayItemsItemProps>({
  name: 'ArrayItemsItem',
  props: ['type'],
  setup(props, { attrs, slots }) {
    const prefixCls = `${stylePrefix}-array-items`

    return () =>
      h(
        'div',
        {
          class: [`${prefixCls}-${props.type || 'card'}`],
          attrs: {
            ...attrs,
          },
          on: {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            change: () => {},
          },
        },
        slots
      )
  },
})

export const ArrayItems = composeExport(ArrayItemsInner, {
  Item: ArrayItemsItem,
  Index: ArrayBase.Index,
  SortHandle: ArrayBase.SortHandle,
  Addition: ArrayBase.Addition,
  Remove: ArrayBase.Remove,
  MoveDown: ArrayBase.MoveDown,
  MoveUp: ArrayBase.MoveUp,
  useArray: ArrayBase.useArray,
  useIndex: ArrayBase.useIndex,
  useRecord: ArrayBase.useRecord,
})

export default ArrayItems
