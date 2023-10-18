import type { ArrayField } from '@formily/core'
import type { ISchema } from '@formily/json-schema'
import { observer } from '@formily/reactive-vue'
import { RecursionField, useField, useFieldSchema } from '@formily/vue'
import type { DefineComponent } from 'vue'
import { defineComponent } from 'vue'
import { SlickList as _SlickList, SlickItem as _SlickItem } from 'vue-slicksort'
import { composeExport, usePrefixCls } from '../__builtins__'
import { ArrayBase } from '../array-base'
import useStyle from './style'

const SlickItem = _SlickItem as DefineComponent<any>
const SlickList = _SlickList as DefineComponent<any>

const isAdditionComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

export interface IArrayItemsItemProps {
  type?: 'card' | 'divide'
}

const ArrayItemsInner = observer(
  defineComponent({
    name: 'ArrayItems',
    setup(_, { attrs }) {
      const fieldRef = useField<ArrayField>()
      const schemaRef = useFieldSchema()

      const prefixCls = usePrefixCls('formily-array-items', attrs.prefixCls as string)
      const [wrapSSR, hashId] = useStyle(prefixCls)
      const { getKey, keyMap } = ArrayBase.useKey(schemaRef.value)

      return () => {
        const field = fieldRef.value
        const schema = schemaRef.value
        const dataSource = Array.isArray(field.value) ? field.value.slice() : []
        if (!schema) throw new Error('can not found schema object')

        const renderItems = () => {
          return (
            <SlickList
              class={`${prefixCls}-list`}
              useDragHandle
              axis="y"
              list={dataSource}
              helperClass={`${prefixCls}-sort-helper`}
              onSortEnd={({ oldIndex, newIndex }) => {
                if (Array.isArray(keyMap)) {
                  keyMap.splice(newIndex, 0, keyMap.splice(oldIndex, 1)[0])
                }
                field.move(oldIndex, newIndex)
              }}
            >
              {dataSource.map((item, index) => {
                const items = Array.isArray(schema.items)
                  ? schema.items[index] || schema.items[0]
                  : schema.items
                const key = getKey(item, index)
                return (
                  <ArrayBase.Item key={key} index={index} record={item}>
                    <SlickItem class={`${prefixCls}-item-inner`} index={index} key={key}>
                      <RecursionField schema={items} name={index} />
                    </SlickItem>
                  </ArrayBase.Item>
                )
              })}
            </SlickList>
          )
        }

        const renderAddition = () => {
          return schema.reduceProperties((addition, schema, key) => {
            if (isAdditionComponent(schema)) {
              return <RecursionField schema={schema} name={key} />
            }
            return addition
          }, null)
        }

        return wrapSSR(
          <ArrayBase keyMap={keyMap}>
            <div class={[prefixCls, hashId.value]} {...attrs}>
              {renderItems()}
              {renderAddition()}
            </div>
          </ArrayBase>
        )
      }
    }
  })
)

const ArrayItemsItem = defineComponent({
  name: 'ArrayItemsItem',
  props: ['type'],
  setup(props, { attrs, slots }) {
    const prefixCls = usePrefixCls('formily-array-items', attrs.prefixCls as string)

    return () => (
      <div class={`${prefixCls}-${props.type || 'card'}`} {...attrs}>
        {slots.default?.()}
      </div>
    )
  }
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
  useRecord: ArrayBase.useRecord
})

export default ArrayItems
