import { defineComponent } from 'vue-demi'
import cls from 'classnames'
import { Card, Row } from 'ant-design-vue'
import { TreeNode, createResource } from '@designable/core'
import { uid } from '@designable/shared'
import {
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
  useNodeIdProps,
} from '@formily/antdv-designable'
import { ArrayBase } from '@formily/antdv'
import { observer } from '@formily/reactive-vue'
import { composeExport, usePrefixCls } from '@formily/antdv/esm/__builtins__'
import {
  hasNodeByComponentPath,
  queryNodesByComponentPath,
  createEnsureTypeItemsNode,
  findNodeByComponentPath,
  createNodeId,
} from '../../shared'
import { useDropTemplate } from '../../hooks'
import { LoadTemplate } from '../../common/LoadTemplate'
import { createArrayBehavior } from '../ArrayBase'
import './styles.less'

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

const isArrayCardsOperation = (name: string) =>
  name === 'ArrayCards.Remove' ||
  name === 'ArrayCards.MoveDown' ||
  name === 'ArrayCards.MoveUp'

export const ArrayCards = composeExport(
  observer(
    defineComponent({
      props: { title: {} },
      setup(props, { slots }) {
        const nodeRef = useTreeNode()
        const nodeIdRef = useNodeIdProps()
        const formilyArrayCardsPrefix = usePrefixCls('formily-array-cards')

        const designerRef = useDropTemplate('ArrayCards', (source) => {
          const indexNode = new TreeNode({
            componentName: nodeRef.value.componentName,
            props: {
              type: 'void',
              'x-component': 'ArrayCards.Index',
            },
          })
          const additionNode = new TreeNode({
            componentName: nodeRef.value.componentName,
            props: {
              type: 'void',
              title: 'Addition',
              'x-component': 'ArrayCards.Addition',
            },
          })
          console.log(additionNode)
          const removeNode = new TreeNode({
            componentName: nodeRef.value.componentName,
            props: {
              type: 'void',
              'x-component': 'ArrayCards.Remove',
            },
          })
          const moveDownNode = new TreeNode({
            componentName: nodeRef.value.componentName,
            props: {
              type: 'void',
              'x-component': 'ArrayCards.MoveDown',
            },
          })
          const moveUpNode = new TreeNode({
            componentName: nodeRef.value.componentName,
            props: {
              type: 'void',
              'x-component': 'ArrayCards.MoveUp',
            },
          })

          const objectNode = new TreeNode({
            componentName: nodeRef.value.componentName,
            props: {
              type: 'object',
            },
            children: [
              indexNode,
              ...source,
              removeNode,
              moveDownNode,
              moveUpNode,
            ],
          })
          return [objectNode, additionNode]
        })

        return () => {
          const node = nodeRef.value
          const nodeId = nodeIdRef.value
          const designer = designerRef.value

          const renderCard = () => {
            if (node.children.length === 0) return <DroppableWidget />
            const additions = queryNodesByComponentPath(node, [
              'ArrayCards',
              'ArrayCards.Addition',
            ])
            const indexes = queryNodesByComponentPath(node, [
              'ArrayCards',
              '*',
              'ArrayCards.Index',
            ])
            const operations = queryNodesByComponentPath(node, [
              'ArrayCards',
              '*',
              isArrayCardsOperation,
            ])
            const children = queryNodesByComponentPath(node, [
              'ArrayCards',
              '*',
              (name) => name.indexOf('ArrayCards.') === -1,
            ])

            const { title, ...cardProps } = props
            return (
              <ArrayBase disabled={true}>
                <ArrayBase.Item index={0}>
                  <Card
                    props={cardProps}
                    class={cls(`${formilyArrayCardsPrefix}-item`)}
                    scopedSlots={{
                      title: () => (
                        <span>
                          {indexes.map((node) => (
                            <TreeNodeWidget key={node.id} node={node} />
                          ))}
                          <span data-content-editable="x-component-props.title">
                            {title}
                          </span>
                        </span>
                      ),
                      extra: () => (
                        <Row justify="space-between" type="flex">
                          <span>
                            {operations.map((node) => (
                              <TreeNodeWidget key={node.id} node={node} />
                            ))}
                            {slots.extra?.()}
                          </span>
                        </Row>
                      ),
                    }}
                  >
                    <div
                      key={uid()}
                      attrs={{
                        ...createNodeId(
                          designer,
                          ensureObjectItemsNode(node).id
                        ),
                      }}
                    >
                      {children.length ? (
                        children.map((node) => (
                          <TreeNodeWidget key={node.id} node={node} />
                        ))
                      ) : (
                        <DroppableWidget hasChildren={false} />
                      )}
                    </div>
                  </Card>
                  <Row justify="space-between" type="flex">
                    {additions.map((node) => {
                      return <TreeNodeWidget key={node.id} node={node} />
                    })}
                  </Row>
                </ArrayBase.Item>
              </ArrayBase>
            )
          }

          return (
            <div attrs={nodeId} class="dn-array-cards">
              {renderCard()}
              <LoadTemplate
                actions={[
                  {
                    title: node.getMessage('addIndex'),
                    icon: 'AddIndex',
                    onClick: () => {
                      if (
                        hasNodeByComponentPath(node, [
                          'ArrayCards',
                          '*',
                          'ArrayCards.Index',
                        ])
                      )
                        return
                      const indexNode = new TreeNode({
                        componentName: node.componentName,
                        props: {
                          type: 'void',
                          'x-component': 'Button',
                        },
                      })
                      ensureObjectItemsNode(node).append(indexNode)
                    },
                  },

                  {
                    title: node.getMessage('addOperation'),
                    icon: 'AddOperation',
                    onClick: () => {
                      const oldAdditionNode = findNodeByComponentPath(node, [
                        'ArrayCards',
                        'ArrayCards.Addition',
                      ])
                      if (!oldAdditionNode) {
                        const additionNode = new TreeNode({
                          componentName: node.componentName,
                          props: {
                            type: 'void',
                            title: 'Addition',
                            'x-component': 'ArrayCards.Addition',
                          },
                        })
                        ensureObjectItemsNode(node).insertAfter(additionNode)
                      }
                      const oldRemoveNode = findNodeByComponentPath(node, [
                        'ArrayCards',
                        '*',
                        'ArrayCards.Remove',
                      ])
                      const oldMoveDownNode = findNodeByComponentPath(node, [
                        'ArrayCards',
                        '*',
                        'ArrayCards.MoveDown',
                      ])
                      const oldMoveUpNode = findNodeByComponentPath(node, [
                        'ArrayCards',
                        '*',
                        'ArrayCards.MoveUp',
                      ])
                      if (!oldRemoveNode) {
                        ensureObjectItemsNode(node).append(
                          new TreeNode({
                            componentName: node.componentName,
                            props: {
                              type: 'void',
                              'x-component': 'ArrayCards.Remove',
                            },
                          })
                        )
                      }
                      if (!oldMoveDownNode) {
                        ensureObjectItemsNode(node).append(
                          new TreeNode({
                            componentName: node.componentName,
                            props: {
                              type: 'void',
                              'x-component': 'ArrayCards.MoveDown',
                            },
                          })
                        )
                      }
                      if (!oldMoveUpNode) {
                        ensureObjectItemsNode(node).append(
                          new TreeNode({
                            componentName: node.componentName,
                            props: {
                              type: 'void',
                              'x-component': 'ArrayCards.MoveUp',
                            },
                          })
                        )
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
    Behavior: createArrayBehavior('ArrayCards'),
    Resource: createResource({
      icon: 'ArrayCardsSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'array',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayCards',
            'x-component-props': {
              title: `Title`,
            },
          },
        },
      ],
    }),
    Addition: ArrayBase.Addition,
    Index: ArrayBase.Index,
    Item: ArrayBase.Item,
    MoveDown: ArrayBase.MoveDown,
    MoveUp: ArrayBase.MoveUp,
    Remove: ArrayBase.Remove,
    SortHandle: ArrayBase.SortHandle,
  }
)
