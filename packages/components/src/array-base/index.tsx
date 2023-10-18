import {
  DeleteOutlined,
  DownOutlined,
  MenuOutlined,
  PlusOutlined,
  UpOutlined
} from '@ant-design/icons-vue'
import type { ArrayField } from '@formily/core'
import { clone, isValid, uid } from '@formily/shared'
import type { Schema } from '@formily/vue'
import { useField, useFieldSchema } from '@formily/vue'
import type { ButtonProps } from 'ant-design-vue'
import { Button } from 'ant-design-vue'
import type { InjectionKey, PropType, Ref } from 'vue'
import { defineComponent, inject, onBeforeUnmount, provide, ref, toRefs, withDirectives } from 'vue'
import { HandleDirective } from 'vue-slicksort'
import { composeExport, resolveComponent, usePrefixCls } from '../__builtins__'
import useStyle from './style'

export type KeyMapProps = WeakMap<Record<string, unknown>, string> | string[] | null

export interface IArrayBaseItemProps {
  index: number
  record: any
}

export type ArrayBaseMixins = {
  Addition: typeof ArrayBaseAddition
  Remove: typeof ArrayBaseRemove
  MoveUp: typeof ArrayBaseMoveUp
  MoveDown: typeof ArrayBaseMoveDown
  SortHandle: typeof ArrayBaseSortHandle
  Index: typeof ArrayBaseIndex
  useArray: typeof useArray
  useIndex: typeof useIndex
  useRecord: typeof useRecord
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
  attrs: {
    [key in string]?: any
  }
  keyMap?: KeyMapProps
}

const ArrayBaseSymbol: InjectionKey<IArrayBaseContext> = Symbol('ArrayBaseContext')
const ItemSymbol: InjectionKey<IArrayBaseItemProps> = Symbol('ItemContext')

const useArray = () => {
  return inject(ArrayBaseSymbol, null)
}

const useIndex = (index?: number) => {
  const itemRef = inject(ItemSymbol)
  if (!itemRef) return ref(index)
  const { index: indexRef } = toRefs(itemRef)
  return indexRef
}

const useRecord = (record?: Record<string, any>) => {
  const itemRef = inject(ItemSymbol)
  if (!itemRef) return ref(record)
  const { record: recordRef } = toRefs(itemRef)
  return recordRef
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
    }
  }
}

const getDefaultValue = (defaultValue: any, schema: Schema) => {
  if (isValid(defaultValue)) return clone(defaultValue)
  if (Array.isArray(schema?.items)) return getDefaultValue(defaultValue, schema.items[0])
  if (schema?.items?.type === 'array') return []
  if (schema?.items?.type === 'boolean') return true
  if (schema?.items?.type === 'date') return ''
  if (schema?.items?.type === 'datetime') return ''
  if (schema?.items?.type === 'number') return 0
  if (schema?.items?.type === 'object') return {}
  if (schema?.items?.type === 'string') return ''
  return null
}

const ArrayBaseInner = defineComponent({
  name: 'ArrayBase',
  props: ['disabled', 'keyMap', 'onAdd'],
  setup(props, { attrs, slots }) {
    const field = useField<ArrayField>()
    const schema = useFieldSchema()
    provide(ArrayBaseSymbol, {
      field,
      schema,
      props,
      attrs,
      keyMap: props.keyMap as KeyMapProps
    })
    return () => {
      return <>{slots.default?.()}</>
    }
  }
})

const ArrayBaseItem = defineComponent({
  name: 'ArrayBaseItem',
  props: ['index', 'record'],
  setup(props, { slots }) {
    provide(ItemSymbol, props)
    return () => {
      return <>{slots.default?.()}</>
    }
  }
})

const ArrayBaseSortHandle = defineComponent({
  name: 'ArrayBaseSortHandle',
  props: ['index'],
  setup(_props, { attrs }) {
    const array = useArray()
    const prefixCls = usePrefixCls('formily-array-base', attrs.prefixCls as string)
    const [wrapSSR, hashId] = useStyle(prefixCls)

    return () => {
      if (!array) return null
      if (array.field.value?.pattern !== 'editable') return null
      return wrapSSR(
        withDirectives(
          <MenuOutlined class={`${prefixCls}-sort-handle ${hashId.value}`} {...attrs} />,
          [[HandleDirective]]
        )
      )
    }
  }
})

const ArrayBaseIndex = defineComponent({
  name: 'ArrayBaseIndex',
  setup(props, { attrs }) {
    const index = useIndex()
    const prefixCls = usePrefixCls('formily-array-base', attrs.prefixCls as string)
    const [wrapSSR, hashId] = useStyle(prefixCls)

    return () => {
      return wrapSSR(
        <span {...attrs} class={`${prefixCls}-index ${hashId.value}`}>
          #{index.value + 1}.
        </span>
      )
    }
  }
})

const arrayBaseAdditionProps = {
  title: {
    type: String
  },
  method: {
    type: String as PropType<'push' | 'unshift'>
  },
  defaultValue: {}
}

export interface IArrayBaseAdditionProps extends ButtonProps {
  title?: string
  method?: 'push' | 'unshift'
  defaultValue?: any
}

const ArrayBaseAddition = defineComponent({
  name: 'ArrayBaseAddition',
  props: arrayBaseAdditionProps,
  setup(props, { attrs, emit }) {
    const self = useField()
    const array = useArray()
    const prefixCls = usePrefixCls('formily-array-base', attrs.prefixCls as string)
    const [wrapSSR, hashId] = useStyle(prefixCls)

    return () => {
      if (!array) return null
      if (array?.field.value.pattern !== 'editable' && array?.field.value.pattern !== 'disabled')
        return null
      const title = props.title || self.value.title
      return wrapSSR(
        <Button
          class={`${prefixCls}-addition ${hashId.value}`}
          type="dashed"
          block
          disabled={array.field.value?.disabled}
          onClick={(e) => {
            if (array.props?.disabled) return
            const defaultValue = getDefaultValue(props.defaultValue, array?.schema.value)
            if (props.method === 'unshift') {
              array?.field?.value.unshift(defaultValue)
              emit('add', defaultValue)
            } else {
              array?.field?.value.push(defaultValue)
              emit('add', array?.field?.value?.value?.length - 1)
            }
            emit('click', e)
          }}
        >
          <PlusOutlined />
          {resolveComponent(title)}
        </Button>
      )
    }
  }
})

const ArrayBaseRemove = defineComponent({
  name: 'ArrayBaseRemove',
  props: {
    index: {
      type: Number
    },
    title: {}
  },
  setup(props, { attrs, emit }) {
    const indexRef = useIndex(props.index)
    const self = useField()
    const base = useArray()
    const prefixCls = usePrefixCls('formily-array-base', attrs.prefixCls as string)
    const [wrapSSR, hashId] = useStyle(prefixCls)

    return () => {
      if (base?.field.value.pattern !== 'editable') return null

      const { title = self.value.title } = props

      const onClick = (e: MouseEvent) => {
        e.stopPropagation()
        if (Array.isArray(base?.keyMap)) {
          base?.keyMap?.splice(indexRef.value, 1)
        }

        base?.field.value.remove(indexRef.value as number)
        emit('remove', indexRef.value)
        emit('click', e)
      }

      if (title) {
        return wrapSSR(
          <Button class={`${prefixCls}-remove ${hashId.value}`} {...attrs} onClick={onClick}>
            <DeleteOutlined />

            {resolveComponent(title)}
          </Button>
        )
      }
      return wrapSSR(
        <DeleteOutlined
          {...attrs}
          class={`${prefixCls}-remove ${hashId.value}`}
          onClick={onClick}
        />
      )
    }
  }
})

const ArrayBaseMoveDown = defineComponent({
  name: 'ArrayBaseMoveDown',
  props: ['title', 'index'],
  setup(props, { attrs, emit }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = usePrefixCls('formily-array-base', attrs.prefixCls as string)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return wrapSSR(
        <DownOutlined
          class={`${prefixCls}-move-down ${hashId.value}`}
          onClick={(e: MouseEvent) => {
            e.stopPropagation()
            if (Array.isArray(base?.keyMap)) {
              base.keyMap.splice(indexRef.value + 1, 0, base.keyMap.splice(indexRef.value, 1)[0])
            }
            base?.field.value.moveDown(indexRef.value as number)
            emit('moveDown', indexRef.value)
            emit('click', e)
          }}
        />
      )
    }
  }
})

const ArrayBaseMoveUp = defineComponent({
  name: 'ArrayBaseMoveUp',
  props: ['title', 'index'],
  setup(props, { attrs, emit }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = usePrefixCls('formily-array-base', attrs.prefixCls as string)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return wrapSSR(
        <UpOutlined
          {...attrs}
          class={`${prefixCls}-move-up ${hashId.value}`}
          onClick={(e: MouseEvent) => {
            e.stopPropagation()
            if (Array.isArray(base?.keyMap)) {
              base.keyMap.splice(indexRef.value - 1, 0, base.keyMap.splice(indexRef.value, 1)[0])
            }

            base?.field.value.moveUp(indexRef.value as number)
            emit('moveUp', indexRef.value)
            emit('click', e)
          }}
        />
      )
    }
  }
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
  useRecord: useRecord
})

export default ArrayBase
