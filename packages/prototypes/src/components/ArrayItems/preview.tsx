import { defineComponent } from 'vue-demi'
import { Row } from 'ant-design-vue'
import { TreeNode, createResource } from '@designable/core'
import {
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
  useNodeIdProps,
} from '@formily/antdv-designable'
import { ArrayBase } from '@formily/antdv'
import { observer } from '@formily/reactive-vue'
import { composeExport } from '@formily/vant/esm/__builtins__'
import { uid } from '@designable/shared'
import {
  queryNodesByComponentPath,
  createEnsureTypeItemsNode,
  createNodeId,
} from '../../shared'
import { useDropTemplate } from '../../hooks'
import { createArrayBehavior } from '../ArrayBase'
import './styles.less'

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

export const ArrayItems = composeExport(
  observer(
    defineComponent({
      props: [],
      setup(props, { attrs }) {
        const nodeRef = useTreeNode()
        const nodeIdRef = useNodeIdProps()

        const designerRef = useDropTemplate('ArrayItems', (source) => {
          const additionNode = new TreeNode({
            componentName: nodeRef.value.componentName,
            props: {
              type: 'void',
              title: 'Addition',
              'x-component': 'ArrayItems.Addition',
            },
          })
          const removeNode = new TreeNode({
            componentName: nodeRef.value.componentName,
            props: {
              type: 'void',
              'x-component': 'ArrayItems.Remove',
            },
          })
          const objectNode = new TreeNode({
            componentName: nodeRef.value.componentName,
            props: {
              type: 'object',
            },
            children: [...source, removeNode],
          })
          return [objectNode, additionNode]
        })

        return () => {
          const node = nodeRef.value
          const nodeId = nodeIdRef.value
          const designer = designerRef.value

          const renderItems = () => {
            if (node.children.length === 0) return <DroppableWidget />
            const additions = queryNodesByComponentPath(node, [
              'ArrayItems',
              'ArrayItems.Addition',
            ])
            const children = queryNodesByComponentPath(node, [
              'ArrayItems',
              '*',
              (name) => name.indexOf('ArrayItems.') === -1,
            ])

            return (
              <ArrayBase disabled={true}>
                <ArrayBase.Item index={0}>
                  <div
                    key={uid()}
                    attrs={{
                      ...createNodeId(designer, ensureObjectItemsNode(node).id),
                    }}
                  >
                    {children.length ? (
                      children.map((node) => (
                        <TreeNodeWidget {...{ key: node.id }} node={node} />
                      ))
                    ) : (
                      <DroppableWidget hasChildren={false} />
                    )}
                  </div>
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
            <div attrs={nodeId} class="dn-array-items">
              {renderItems()}
            </div>
          )
        }
      },
    })
  ),
  {
    Behavior: createArrayBehavior('ArrayItems'),
    Resource: createResource({
      icon: 'ArrayCardsSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'array',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems',
          },
        },
      ],
    }),
    Addition: ArrayBase.Addition,
    Item: ArrayBase.Item,
    Remove: ArrayBase.Remove,
  }
)
