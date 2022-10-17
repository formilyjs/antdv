import { Table, Row } from 'ant-design-vue'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
  useNodeIdProps,
} from '@formily/antdv-designable'
import { ArrayBase } from '@formily/antdv'
import { observer } from '@formily/reactive-vue'
import cls from 'classnames'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { defineComponent, getCurrentInstance, onMounted } from 'vue-demi'
import { uid } from '@designable/shared'
import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { createVoidFieldSchema } from '../Field'
import { createArrayBehavior } from '../ArrayBase'
import { useDropTemplate } from '../../hooks'
import {
  queryNodesByComponentPath,
  hasNodeByComponentPath,
  findNodeByComponentPath,
  createEnsureTypeItemsNode,
} from '../../shared'
import { LoadTemplate } from '../../common/LoadTemplate'
import './styles.less'
import type { VueComponent } from '@formily/vue'
import type { DnFC } from '@formily/antdv-designable'
import type { Table as TableProps } from 'ant-design-vue'

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

const HeaderCell = defineComponent({
  props: { className: { type: String } },
  setup(props, { slots }) {
    const { proxy: vm } = getCurrentInstance()
    onMounted(() => {
      const element = vm.$el.parentNode.parentNode as HTMLElement
      element.setAttribute(
        'data-designer-node-id',
        props.className.match(/data-id\:([^\s]+)/)?.[1]
      )
    })
    return () => {
      return slots.default?.()
    }
  },
})

const BodyCell = defineComponent({
  props: { className: { type: String } },
  setup(props, { slots }) {
    const { proxy: vm } = getCurrentInstance()
    onMounted(() => {
      const element = vm.$el.parentNode.parentNode as HTMLElement
      element.setAttribute(
        'data-designer-node-id',
        props.className.match(/data-id\:([^\s]+)/)?.[1]
      )
    })
    return () => {
      return slots.default?.()
    }
  },
})

// TableProps<any>
export const ArrayTable: DnFC<TableProps> = composeExport(
  observer(
    defineComponent({
      props: { className: {} },
      setup(props, { attrs, slots }) {
        const nodeRef = useTreeNode()
        const nodeIdRef = useNodeIdProps()
        useDropTemplate('ArrayTable', (source) => {
          const sortHandleNode = new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: `Title`,
              },
            },
            children: [
              {
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ArrayTable.SortHandle',
                },
              },
            ],
          })
          const indexNode = new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: `Title`,
              },
            },
            children: [
              {
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ArrayTable.Index',
                },
              },
            ],
          })
          const columnNode = new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: `Title`,
              },
            },
            children: source.map((node) => {
              node.props.title = undefined
              return node
            }),
          })

          const operationNode = new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: `Title`,
              },
            },
            children: [
              {
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ArrayTable.Remove',
                },
              },
              {
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ArrayTable.MoveDown',
                },
              },
              {
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ArrayTable.MoveUp',
                },
              },
            ],
          })
          const objectNode = new TreeNode({
            componentName: 'Field',
            props: {
              type: 'object',
            },
            children: [sortHandleNode, indexNode, columnNode, operationNode],
          })
          const additionNode = new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              title: 'Addition',
              'x-component': 'ArrayTable.Addition',
            },
          })
          return [objectNode, additionNode]
        })

        useDropTemplate('ArrayTable.Column', (source) => {
          return source.map((node) => {
            node.props.title = undefined
            return node
          })
        })

        return () => {
          const node = nodeRef.value
          const nodeId = nodeIdRef.value
          const columns = queryNodesByComponentPath(node, [
            'ArrayTable',
            '*',
            'ArrayTable.Column',
          ])
          const additions = queryNodesByComponentPath(node, [
            'ArrayTable',
            'ArrayTable.Addition',
          ])

          const defaultRowKey = () => {
            return node.id
          }

          const renderTable = () => {
            if (node.children.length === 0) return <DroppableWidget />
            return (
              <ArrayBase disabled>
                {/* TODO:: rerender table cuz table resizes when insert new value */}
                <Table
                  size="small"
                  bordered
                  key={uid()}
                  attrs={attrs}
                  rowKey={defaultRowKey}
                  class="antdv-formily-array-table"
                  style={{ marginBottom: '10px' }}
                  data={[{ id: '1' }]}
                >
                  {columns.map((node, index) => {
                    const children = node.children.map((child) => {
                      return <TreeNodeWidget node={child} key={child.id} />
                    })
                    const props = node.props['x-component-props']
                    return (
                      <Table.Column
                        attrs={props}
                        key={node.id}
                        dataIndex={node.id}
                        class={`data-id:${node.id}`}
                        scopedSlots={{
                          default: ({ row, column, $index }) => {
                            return (
                              <BodyCell
                              // attrs={{ className: `data-id:${node.id}` }}
                              >
                                <ArrayBase.Item index={$index}>
                                  {children.length > 0 ? children : 'Droppable'}
                                </ArrayBase.Item>
                              </BodyCell>
                            )
                          },
                          header: ({ column, $index }) => {
                            return (
                              <HeaderCell
                              // attrs={{ className: `data-id:${node.id}` }}
                              >
                                <span data-content-editable="x-component-props.label">
                                  {props.label}
                                </span>
                              </HeaderCell>
                            )
                          },
                        }}
                      ></Table.Column>
                    )
                  })}
                  {columns.length === 0 && (
                    <Table.Column>
                      <DroppableWidget />
                    </Table.Column>
                  )}
                </Table>
                {/* TODO::some how cannot make it working */}
                <Row justify="center" type="flex">
                  {additions.map((node) => {
                    return <ArrayBase.Addition title="添加条目" />
                  })}
                </Row>
              </ArrayBase>
            )
          }
          return (
            <div attrs={nodeId} class="dn-array-table">
              {renderTable()}
              <LoadTemplate
                actions={[
                  {
                    title: node.getMessage('addSortHandle'),
                    icon: 'AddSort',
                    onClick: () => {
                      if (
                        hasNodeByComponentPath(node, [
                          'ArrayTable',
                          '*',
                          'ArrayTable.Column',
                          'ArrayTable.SortHandle',
                        ])
                      )
                        return
                      const tableColumn = new TreeNode({
                        componentName: 'Field',
                        props: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            label: `排序`,
                          },
                        },
                        children: [
                          {
                            componentName: 'Field',
                            props: {
                              type: 'void',
                              'x-component': 'ArrayTable.SortHandle',
                            },
                          },
                        ],
                      })
                      ensureObjectItemsNode(node).prepend(tableColumn)
                    },
                  },
                  {
                    title: node.getMessage('addIndex'),
                    icon: 'AddIndex',
                    onClick: () => {
                      if (
                        hasNodeByComponentPath(node, [
                          'ArrayTable',
                          '*',
                          'ArrayTable.Column',
                          'ArrayTable.Index',
                        ])
                      )
                        return
                      const tableColumn = new TreeNode({
                        componentName: 'Field',
                        props: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            label: `序号`,
                          },
                        },
                        children: [
                          {
                            componentName: 'Field',
                            props: {
                              type: 'void',
                              'x-component': 'ArrayTable.Index',
                            },
                          },
                        ],
                      })
                      const sortNode = findNodeByComponentPath(node, [
                        'ArrayTable',
                        '*',
                        'ArrayTable.Column',
                        'ArrayTable.SortHandle',
                      ])
                      if (sortNode) {
                        sortNode.parent.insertAfter(tableColumn)
                      } else {
                        ensureObjectItemsNode(node).prepend(tableColumn)
                      }
                    },
                  },
                  {
                    title: node.getMessage('addColumn'),
                    icon: 'AddColumn',
                    onClick: () => {
                      const operationNode = findNodeByComponentPath(node, [
                        'ArrayTable',
                        '*',
                        'ArrayTable.Column',
                        (name) => {
                          return (
                            name === 'ArrayTable.Remove' ||
                            name === 'ArrayTable.MoveDown' ||
                            name === 'ArrayTable.MoveUp'
                          )
                        },
                      ])
                      const tableColumn = new TreeNode({
                        componentName: 'Field',
                        props: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            label: `Title`,
                          },
                        },
                      })
                      if (operationNode) {
                        operationNode.parent.insertBefore(tableColumn)
                      } else {
                        ensureObjectItemsNode(node).append(tableColumn)
                      }
                    },
                  },
                  {
                    title: node.getMessage('addOperation'),
                    icon: 'AddOperation',
                    onClick: () => {
                      const oldOperationNode = findNodeByComponentPath(node, [
                        'ArrayTable',
                        '*',
                        'ArrayTable.Column',
                        (name) => {
                          return (
                            name === 'ArrayTable.Remove' ||
                            name === 'ArrayTable.MoveDown' ||
                            name === 'ArrayTable.MoveUp'
                          )
                        },
                      ])
                      const oldAdditionNode = findNodeByComponentPath(node, [
                        'ArrayTable',
                        'ArrayTable.Addition',
                      ])
                      if (!oldOperationNode) {
                        const operationNode = new TreeNode({
                          componentName: 'Field',
                          props: {
                            type: 'void',
                            'x-component': 'ArrayTable.Column',
                            'x-component-props': {
                              label: `操作`,
                            },
                          },
                          children: [
                            {
                              componentName: 'Field',
                              props: {
                                type: 'void',
                                'x-component': 'ArrayTable.Remove',
                              },
                            },
                            {
                              componentName: 'Field',
                              props: {
                                type: 'void',
                                'x-component': 'ArrayTable.MoveDown',
                              },
                            },
                            {
                              componentName: 'Field',
                              props: {
                                type: 'void',
                                'x-component': 'ArrayTable.MoveUp',
                              },
                            },
                          ],
                        })
                        ensureObjectItemsNode(node).append(operationNode)
                      }
                      if (!oldAdditionNode) {
                        const additionNode = new TreeNode({
                          componentName: 'Field',
                          props: {
                            type: 'void',
                            title: 'Addition',
                            'x-component': 'ArrayTable.Addition',
                          },
                        })
                        ensureObjectItemsNode(node).insertAfter(additionNode)
                      }
                    },
                  },
                ]}
              />
            </div>
          )
        }
      },
    })
  ),
  {
    Behavior: createBehavior(createArrayBehavior('ArrayTable'), {
      name: 'ArrayTable.Column',
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === 'ArrayTable.Column',
      designerProps: {
        droppable: true,
        allowDrop: (node) =>
          node.props['type'] === 'object' &&
          node.parent?.props?.['x-component'] === 'ArrayTable',
        propsSchema: createVoidFieldSchema(AllSchemas.ArrayTable.Column),
      },
      designerLocales: AllLocales.ArrayTableColumn,
    }),
    Resource: createResource({
      icon: 'ArrayTableSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'array',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayTable',
          },
        },
      ],
    }),
    Column: () => null,
    Index: ArrayBase.Index,
    SortHandle: ArrayBase.SortHandle,
    Addition: ArrayBase.Addition,
    Remove: ArrayBase.Remove,
    MoveDown: ArrayBase.MoveDown,
    MoveUp: ArrayBase.MoveUp,
    useArray: ArrayBase.useArray,
    useIndex: ArrayBase.useIndex,
    useRecord: ArrayBase.useRecord,
  }
)
