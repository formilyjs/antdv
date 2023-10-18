import type { ArrayField, FieldDisplayTypes, GeneralField } from '@formily/core'
import type { Schema } from '@formily/json-schema'
import { observer } from '@formily/reactive-vue'
import { isArr, isBool } from '@formily/shared'
import { RecursionField, useField, useFieldSchema } from '@formily/vue'
import type { PaginationProps } from 'ant-design-vue'
import { Badge, Pagination, Select, Table } from 'ant-design-vue'
import type { ColumnProps, TableProps } from 'ant-design-vue/es/table'
import type { Ref, VNode } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import { FieldContext, composeExport, usePrefixCls } from '../__builtins__'
import { ArrayBase } from '../array-base'
import { Space } from '../space'
import useStyle from './style'

interface ObservableColumnSource {
  field: GeneralField
  columnProps: ColumnProps
  schema: Schema
  display: FieldDisplayTypes
  name: string
}

interface IArrayTablePaginationProps extends PaginationProps {
  dataSource?: any[]
}

const isColumnComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Column') > -1
}

const isOperationsComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Operations') > -1
}

const isAdditionComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

const useArrayTableSources = (arrayFieldRef: Ref<ArrayField>, schemaRef: Ref<Schema>) => {
  const arrayField = arrayFieldRef.value
  const parseSources = (schema: Schema): ObservableColumnSource[] => {
    if (isColumnComponent(schema) || isOperationsComponent(schema) || isAdditionComponent(schema)) {
      if (!schema['x-component-props']?.['dataIndex'] && !schema['name']) return []
      const name = schema['x-component-props']?.['dataIndex'] || schema['name']
      const field = arrayField.query(arrayField.address.concat(name)).take()
      const columnProps = field?.component?.[1] || schema['x-component-props'] || {}
      const display = field?.display || schema['x-display']
      return [
        {
          name,
          display,
          field,
          schema,
          columnProps
        }
      ]
    } else if (schema.properties) {
      return schema.reduceProperties((buf, schema) => {
        return buf.concat(parseSources(schema))
      }, [])
    }
  }

  const parseArrayItems = (schema: Schema['items']) => {
    if (!schema) return []
    const sources: ObservableColumnSource[] = []
    const items = isArr(schema) ? schema : [schema]
    return items.reduce((columns, schema) => {
      const item = parseSources(schema)
      if (item) {
        return columns.concat(item)
      }
      return columns
    }, sources)
  }

  if (!schemaRef.value) throw new Error('can not found schema object')

  return parseArrayItems(schemaRef.value.items)
}

const useArrayTableColumns = (
  dataSource: any[],
  sources: ObservableColumnSource[]
): ColumnProps[] => {
  return sources.reduce<ColumnProps[]>(
    (buf, { name, columnProps, schema, display, field }, key) => {
      if (display !== 'visible') return buf
      if (!isColumnComponent(schema)) return buf
      return buf.concat({
        ...columnProps,
        dataIndex: name,
        customRender: ({ record }) => {
          const index = dataSource.indexOf(record)
          const children = (
            <ArrayBase.Item key={`${key}${index}`} index={index} record={record}>
              <FieldContext.Provider value={field}>
                <RecursionField schema={schema} name={index} onlyRenderProperties></RecursionField>
              </FieldContext.Provider>
            </ArrayBase.Item>
          )

          return children
        }
      })
    },
    []
  )
}

const useAddition = () => {
  const schema = useFieldSchema()
  return schema.value.reduceProperties((addition, schema, key) => {
    if (isAdditionComponent(schema)) {
      return <RecursionField schema={schema} name={key}></RecursionField>
    }
    return addition
  }, null)
}

const schedulerRequest = {
  request: null
}

const StatusSelect = observer(
  defineComponent({
    props: ['value', 'options', 'pageSize', 'onChange'],
    setup(props, { attrs }) {
      const fieldRef = useField<ArrayField>()
      const prefixCls = usePrefixCls('formily-array-table', attrs.prefixCls as string)
      const [wrapSSR, hashId] = useStyle(prefixCls)

      return () => {
        const field = fieldRef.value
        const width = String(props.options?.length).length * 15
        const errors = field.errors
        const parseIndex = (address: string) => {
          return Number(
            address.slice(address.indexOf(field.address.toString()) + 1).match(/(\d+)/)?.[1]
          )
        }
        return wrapSSR(
          <Select
            style={{
              width: `${width < 60 ? 60 : width}px`
            }}
            class={[
              `${prefixCls}-status-select`,
              {
                'has-error': errors?.length
              },
              hashId.value
            ]}
            value={props.value}
            virtual
            onChange={props.onChange}
          >
            {props.options?.map(({ label, value }) => {
              const hasError = errors.some(({ address }) => {
                const currentIndex = parseIndex(address)
                const startIndex = (value - 1) * props.pageSize
                const endIndex = value * props.pageSize
                return currentIndex >= startIndex && currentIndex <= endIndex
              })
              return (
                <Select.Option key={value} label={label} value={value}>
                  {hasError ? <Badge dot>{label}</Badge> : label}
                </Select.Option>
              )
            })}
          </Select>
        )
      }
    }
  }),
  {
    scheduler: (update) => {
      clearTimeout(schedulerRequest.request)
      schedulerRequest.request = setTimeout(() => {
        update()
      }, 100)
    }
  }
)

const ArrayTablePagination = defineComponent<IArrayTablePaginationProps>({
  inheritAttrs: false,
  setup(_props, { attrs, slots }) {
    const prefixCls = usePrefixCls('formily-array-table', attrs.prefixCls as string)
    const current = ref(1)
    return () => {
      const props = attrs as unknown as IArrayTablePaginationProps
      const pageSize = computed(() => props.pageSize || 10)
      const dataSource = computed(() => props.dataSource || [])
      const startIndex = computed(() => (current.value - 1) * pageSize.value)
      const size = computed(() => props.size || 'default')
      const endIndex = computed(() => startIndex.value + pageSize.value - 1)
      const total = computed(() => dataSource.value?.length || 0)
      const totalPage = computed(() => Math.ceil(total.value / pageSize.value))
      const pages = computed(() =>
        Array.from(new Array(totalPage.value)).map((_, index) => {
          const page = index + 1
          return {
            label: page,
            value: page
          }
        })
      )

      const handleChange = (val: number) => {
        current.value = val
      }

      const renderPagination = () => {
        if (totalPage.value <= 1) return
        return (
          <div class={`${prefixCls}-pagination`}>
            <Space>
              <StatusSelect
                value={current.value}
                onChange={handleChange}
                pageSize={pageSize.value}
                options={pages.value}
              ></StatusSelect>
              <Pagination
                {...props}
                pageSize={pageSize.value}
                current={current.value}
                size={size.value}
                total={total.value}
                showSizeChanger={false}
                onChange={handleChange}
              ></Pagination>
            </Space>
          </div>
        )
      }
      return (
        <>
          {slots.default?.(
            dataSource.value?.slice(startIndex.value, endIndex.value + 1),
            renderPagination
          )}
        </>
      )
    }
  }
})

const ArrayTableInner = observer(
  defineComponent<TableProps>({
    name: 'ArrayTable',
    inheritAttrs: false,
    setup(_props, { attrs, slots }) {
      const fieldRef = useField<ArrayField>()
      const schemaRef = useFieldSchema()
      const prefixCls = usePrefixCls('formily-array-table', attrs.prefixCls as string)
      const [wrapSSR, hashId] = useStyle(prefixCls)
      const { getKey, keyMap } = ArrayBase.useKey(schemaRef.value)

      const defaultRowKey = (record: any) => {
        return getKey(record)
      }

      return () => {
        const props = attrs as unknown as TableProps
        const field = fieldRef.value
        const dataSource = Array.isArray(field.value) ? field.value.slice() : []
        const sources = useArrayTableSources(fieldRef, schemaRef)
        const columns = useArrayTableColumns(dataSource, sources)
        const pagination = isBool(props.pagination) ? {} : props.pagination

        const renderStateManager = () =>
          sources.map((column, key) => {
            const { name, schema } = column
            //专门用来承接对Column的状态管理
            if (!isColumnComponent(schema)) return
            return <RecursionField key={key} name={name} schema={schema} onlyRenderSelf />
          })

        const renderTable = (dataSource?: any[], pager?: () => VNode) => {
          return wrapSSR(
            <div class={[prefixCls, hashId.value]}>
              <ArrayBase keyMap={keyMap}>
                <Table
                  {...attrs}
                  size="small"
                  bordered
                  pagination={false}
                  rowKey={defaultRowKey}
                  columns={columns}
                  dataSource={dataSource}
                >
                  {slots.default?.()}
                </Table>
                {renderStateManager()}
                <div
                  style={{
                    marginTop: '5px',
                    marginBottom: '5px'
                  }}
                >
                  {pager?.()}
                </div>
                {useAddition()}
              </ArrayBase>
            </div>
          )
        }

        if (!pagination) {
          return renderTable(dataSource, null)
        }

        return (
          <ArrayTablePagination {...pagination} dataSource={dataSource}>
            {(dataSource: any[], pager: () => VNode) => {
              return renderTable(dataSource, pager)
            }}
          </ArrayTablePagination>
        )
      }
    }
  })
)

const ArrayTableColumn = defineComponent({
  name: 'ArrayTableColumn',
  render() {
    return <>{null}</>
  }
})

export const ArrayTable = composeExport(ArrayTableInner, {
  Column: ArrayTableColumn,
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

export default ArrayTable
