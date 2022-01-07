import { Button, Icon } from 'ant-design-vue'
import { stylePrefix } from '../__builtins__/configs'
import { Fragment, useField, useFieldSchema, h } from '@formily/vue'
import { isValid, clone, uid } from '@formily/shared'
import type { ArrayField } from '@formily/core'
import type { Button as ButtonProps } from 'ant-design-vue/types/button/button'
import type { Schema } from '@formily/json-schema'
import type { Ref, InjectionKey } from '@vue/composition-api'
import {
  defineComponent,
  provide,
  inject,
  toRefs,
  ref,
  onBeforeUnmount,
} from '@vue/composition-api'
import { HandleDirective } from 'vue-slicksort'
import { composeExport } from '../__builtins__/shared'

export type KeyMapProps =
  | WeakMap<Record<string, unknown>, string>
  | string[]
  | null

export interface IArrayBaseAdditionProps extends ButtonProps {
  title?: string
  method?: 'push' | 'unshift'
  defaultValue?: any
}

export interface IArrayBaseItemProps {
  index: number
  record: any
}

export type ArrayBaseMixins = {
  Addition?: typeof ArrayBaseAddition
  Remove?: typeof ArrayBaseRemove
  MoveUp?: typeof ArrayBaseMoveUp
  MoveDown?: typeof ArrayBaseMoveDown
  SortHandle?: typeof ArrayBaseSortHandle
  Index?: typeof ArrayBaseIndex
  useArray?: typeof useArray
  useIndex?: typeof useIndex
  useRecord?: typeof useRecord
}

export interface IArrayBaseProps {
  disabled?: boolean
  onAdd?: (index: number) => void
  onRemove?: (index: number) => void
  onMoveDown?: (index: number) => void
  onMoveUp?: (index: number) => void
  keyMap?: KeyMapProps
}

export interface IArrayBaseContext {
  props: IArrayBaseProps
  field: Ref<ArrayField>
  schema: Ref<Schema>
  listeners: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [key in string]?: Function
  }
  keyMap?: KeyMapProps
}

const ArrayBaseSymbol: InjectionKey<IArrayBaseContext> =
  Symbol('ArrayBaseContext')
const ItemSymbol: InjectionKey<IArrayBaseItemProps> = Symbol('ItemContext')

const useArray = () => {
  return inject(ArrayBaseSymbol, null)
}

const useIndex = (index?: number) => {
  const { index: indexRef } = toRefs(inject(ItemSymbol))
  return indexRef ?? ref(index)
}

const useRecord = (record?: number) => {
  const { record: recordRef } = toRefs(inject(ItemSymbol))
  return recordRef ?? ref(record)
}

const isObjectValue = (schema: Schema) => {
  if (Array.isArray(schema?.items)) return isObjectValue(schema.items[0])

  if (schema?.items?.type === 'array' || schema?.items?.type === 'object') {
    return true
  }
  return false
}

const useKey = (schema: Schema) => {
  const isObject = isObjectValue(schema)
  let keyMap: KeyMapProps = null

  if (isObject) {
    keyMap = new WeakMap()
  } else {
    keyMap = []
  }

  onBeforeUnmount(() => {
    keyMap = null
  })

  return {
    keyMap,
    getKey: (record: any, index?: number) => {
      if (keyMap instanceof WeakMap) {
        if (!keyMap.has(record)) {
          keyMap.set(record, uid())
        }
        return `${keyMap.get(record)}-${index}`
      }

      if (!keyMap[index]) {
        keyMap[index] = uid()
      }

      return `${keyMap[index]}-${index}`
    },
  }
}

const getDefaultValue = (defaultValue: any, schema: Schema) => {
  if (isValid(defaultValue)) return clone(defaultValue)
  if (Array.isArray(schema?.items))
    return getDefaultValue(defaultValue, schema.items[0])
  if (schema?.items?.type === 'array') return []
  if (schema?.items?.type === 'boolean') return true
  if (schema?.items?.type === 'date') return ''
  if (schema?.items?.type === 'datetime') return ''
  if (schema?.items?.type === 'number') return 0
  if (schema?.items?.type === 'object') return {}
  if (schema?.items?.type === 'string') return ''
  return null
}

const ArrayBaseInner = defineComponent<IArrayBaseProps>({
  name: 'ArrayBase',
  props: ['disabled', 'keyMap'],
  setup(props, { listeners, slots }) {
    const field = useField<ArrayField>()
    const schema = useFieldSchema()
    provide(ArrayBaseSymbol, {
      field,
      schema,
      props,
      listeners,
      keyMap: props.keyMap as KeyMapProps,
    })
    return () => {
      return h(Fragment, {}, slots)
    }
  },
})

const ArrayBaseItem = defineComponent({
  name: 'ArrayBaseItem',
  props: ['index', 'record'],
  setup(props: IArrayBaseItemProps, { slots }) {
    provide(ItemSymbol, props)
    return () => {
      return h(Fragment, {}, slots)
    }
  },
})

const ArrayBaseSortHandle = defineComponent({
  name: 'ArrayBaseSortHandle',
  props: ['index'],
  directives: {
    handle: HandleDirective,
  },
  setup(props, { attrs }) {
    const array = useArray()
    const prefixCls = `${stylePrefix}-array-base`

    return () => {
      if (!array) return null
      if (array.field.value?.pattern !== 'editable') return null

      return h(
        Icon,
        {
          directives: [{ name: 'handle' }],
          class: [`${prefixCls}-sort-handle`],
          style: attrs.style,
          props: {
            type: 'menu',
          },
          attrs: {
            ...attrs,
          },
        },
        {}
      )
    }
  },
})

const ArrayBaseIndex = defineComponent({
  name: 'ArrayBaseIndex',
  setup(props, { attrs }) {
    const index = useIndex()
    const prefixCls = `${stylePrefix}-array-base`
    return () => {
      return h(
        'span',
        {
          class: `${prefixCls}-index`,
          attrs,
        },
        {
          default: () => [`#${index.value + 1}.`],
        }
      )
    }
  },
})

const ArrayBaseAddition = defineComponent({
  name: 'ArrayBaseAddition',
  props: ['title', 'method', 'defaultValue'],
  setup(props: IArrayBaseAdditionProps, { listeners }) {
    const self = useField()
    const array = useArray()
    const prefixCls = `${stylePrefix}-array-base`
    return () => {
      if (!array) return null
      if (
        array?.field.value.pattern !== 'editable' &&
        array?.field.value.pattern !== 'disabled'
      )
        return null
      return h(
        Button,
        {
          class: `${prefixCls}-addition`,
          attrs: {
            ...props,
            type: 'dashed',
            block: true,
            disabled: array.field.value?.disabled,
          },
          on: {
            ...listeners,
            click: (e) => {
              if (array.props?.disabled) return
              const defaultValue = getDefaultValue(
                props.defaultValue,
                array?.schema.value
              )
              if (props.method === 'unshift') {
                array?.field?.value.unshift(defaultValue)
                array.listeners?.add?.(0)
              } else {
                array?.field?.value.push(defaultValue)
                array.listeners?.add?.(array?.field?.value?.value?.length - 1)
              }
              if (listeners.click) {
                listeners.click(e)
              }
            },
          },
        },
        {
          default: () => [
            h(Icon, { props: { type: 'plus' } }, {}),
            self.value.title || props.title,
          ],
        }
      )
    }
  },
})

const ArrayBaseRemove = defineComponent<{ title?: string; index?: number }>({
  name: 'ArrayBaseRemove',
  props: ['title', 'index'],
  setup(props, { attrs, listeners }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        Icon,
        {
          class: `${prefixCls}-remove`,
          attrs,
          props: {
            type: 'delete',
          },
          on: {
            ...listeners,
            click: (e: MouseEvent) => {
              e.stopPropagation()
              if (Array.isArray(base?.keyMap)) {
                base?.keyMap?.splice(indexRef.value, 1)
              }

              base?.field.value.remove(indexRef.value as number)
              base?.listeners?.remove?.(indexRef.value as number)

              if (listeners.click) {
                listeners.click(e)
              }
            },
          },
        },
        {}
      )
    }
  },
})

const ArrayBaseMoveDown = defineComponent<{ title?: string; index?: number }>({
  name: 'ArrayBaseMoveDown',
  props: ['title', 'index'],
  setup(props, { attrs, listeners }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        Icon,
        {
          class: `${prefixCls}-move-down`,
          attrs,
          props: {
            type: 'down',
          },
          on: {
            ...listeners,
            click: (e: MouseEvent) => {
              e.stopPropagation()
              if (Array.isArray(base?.keyMap)) {
                base.keyMap.splice(
                  indexRef.value + 1,
                  0,
                  base.keyMap.splice(indexRef.value, 1)[0]
                )
              }

              base?.field.value.moveDown(indexRef.value as number)
              base?.listeners?.moveDown?.(indexRef.value as number)

              if (listeners.click) {
                listeners.click(e)
              }
            },
          },
        },
        {}
      )
    }
  },
})

const ArrayBaseMoveUp = defineComponent<{ title?: string; index?: number }>({
  name: 'ArrayBaseMoveUp',
  props: ['title', 'index'],
  setup(props, { attrs, listeners }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        Icon,
        {
          class: `${prefixCls}-move-up`,
          attrs,
          props: {
            type: 'up',
          },
          on: {
            ...listeners,
            click: (e: MouseEvent) => {
              e.stopPropagation()
              if (Array.isArray(base?.keyMap)) {
                base.keyMap.splice(
                  indexRef.value - 1,
                  0,
                  base.keyMap.splice(indexRef.value, 1)[0]
                )
              }

              base?.field.value.moveUp(indexRef.value as number)
              base?.listeners?.moveUp?.(indexRef.value as number)

              if (listeners.click) {
                listeners.click(e)
              }
            },
          },
        },
        {}
      )
    }
  },
})

export const ArrayBase = composeExport(ArrayBaseInner, {
  Index: ArrayBaseIndex,
  Item: ArrayBaseItem,
  SortHandle: ArrayBaseSortHandle,
  Addition: ArrayBaseAddition,
  Remove: ArrayBaseRemove,
  MoveDown: ArrayBaseMoveDown,
  MoveUp: ArrayBaseMoveUp,
  useArray: useArray,
  useIndex: useIndex,
  useKey: useKey,
  useRecord: useRecord,
})

export default ArrayBase
