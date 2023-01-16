import { defineComponent, getCurrentInstance, onMounted } from 'vue-demi'
import { Table, Row } from 'ant-design-vue'
import { observer } from '@formily/reactive-vue'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import { uid } from '@designable/shared'
import {
  useDesigner,
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
  useNodeIdProps,
} from '@formily/antdv-designable'
import { ArrayBase } from '@formily/antdv'
import { composeExport, usePrefixCls } from '@formily/antdv/esm/__builtins__'
import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { useDropTemplate } from '../../hooks'
import {
  queryNodesByComponentPath,
  hasNodeByComponentPath,
  findNodeByComponentPath,
  createEnsureTypeItemsNode,
} from '../../shared'
import { LoadTemplate } from '../../common/LoadTemplate'
import { createVoidFieldSchema } from '../Field'
import { createArrayBehavior } from '../ArrayBase'
import './styles.less'

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

// TableProps<any>
export const ArrayTable = composeExport(
  observer(
    defineComponent({
      props: { className: {} },
      setup(props, { attrs }) {
        const designerRef = useDesigner()
        const nodeRef = useTreeNode()
        const nodeIdRef = useNodeIdProps()
        const formilyArrayTablePrefix = usePrefixCls('formily-array-table')

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
              title: `Addition`,
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
              <ArrayBase disabled={true}>
                {/* TODO:: rerender table cuz table resizes when insert new value */}
                <Table
                  size="small"
                  bordered
                  key={uid()}
                  attrs={attrs}
                  rowKey={defaultRowKey}
                  class={formilyArrayTablePrefix}
                  style={{ marginBottom: '10px' }}
                  dataSource={[{ id: '1' }]}
                  pagination={false}
                >
                  {columns.map((node) => {
                    const children = node.children.map((child) => {
                      return <TreeNodeWidget key={child.id} node={child} />
                    })
                    const { title, ...columnProps } =
                      node.props['x-component-props']
                    return (
                      <Table.Column
                        attrs={columnProps}
                        key={node.id}
                        dataIndex={node.id}
                        class={`data-id:${node.id}`}
                        customHeaderCell={() => ({
                          attrs: {
                            [designerRef.value.props.nodeIdAttrName]: node.id,
                          },
                        })}
                        customCell={() => ({
                          attrs: {
                            [designerRef.value.props.nodeIdAttrName]: node.id,
                          },
                        })}
                        customRender={(text, record, index) => (
                          <ArrayBase.Item index={index}>
                            {children.length > 0 ? children : 'Droppable'}
                          </ArrayBase.Item>
                        )}
                        title={() => (
                          <span data-content-editable="x-component-props.title">
                            {title}
                          </span>
                        )}
                      ></Table.Column>
                    )
                  })}
                  {columns.length === 0 && (
                    <Table.Column>
                      <DroppableWidget />
                    </Table.Column>
                  )}
                </Table>
                <Row justify="space-between" type="flex">
                  {additions.map((node) => {
                    return <TreeNodeWidget key={node.id} node={node} />
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
                            title: `序号`,
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
                            title: `Title`,
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
                              title: `操作`,
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
