import { observer } from '@formily/reactive-vue'
import { Collapse } from 'ant-design-vue'
import { TreeNode, createBehavior, createResource } from '@pind/designable-core'
import {
  useTreeNode,
  useNodeIdProps,
  DroppableWidget,
  TreeNodeWidget,
  useSelection
} from '@formily/antdv-designable'
import { toArr } from '@formily/shared'
import { defineComponent, nextTick, ref } from 'vue'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { LoadTemplate } from '../../common/LoadTemplate'
import { useDropTemplate } from '../../hooks'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { matchComponent } from '../../shared'

const parseCollapse = (parent: TreeNode) => {
  const tabs: TreeNode[] = []
  parent.children.forEach((node) => {
    if (matchComponent(node, 'FormCollapse.CollapsePanel')) {
      tabs.push(node)
    }
  })
  return tabs
}
// CollapsePanel: FragmentComponent,
// & {
//   CollapsePanel?: VueComponent<CollapsePanelProps>
// }
export const FormCollapse = composeExport(
  observer(
    defineComponent({
      name: 'DnFormCollapse',
      props: { accordion: Boolean },
      setup(props, { attrs }) {
        const activeKeyRef = ref<string | string[]>([])

        const setActiveKey = (value) => {
          activeKeyRef.value = value
        }
        const nodeRef = useTreeNode()
        const nodeIdRef = useNodeIdProps()
        const selectionRef = useSelection()

        const designerRef = useDropTemplate('FormCollapse', (source) => {
          const panelNode = new TreeNode({
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'FormCollapse.CollapsePanel',
              'x-component-props': {
                header: `Unnamed Title`
              }
            },
            children: source
          })

          setActiveKey(toArr(activeKeyRef.value).concat(panelNode.id))
          return [panelNode]
        })

        const getCorrectActiveKey = (activeKey: string[] | string, tabs: TreeNode[]) => {
          if (!tabs.length || !activeKey?.length) {
            if (props.accordion) {
              return tabs[0]?.id
            }
            return tabs.map((item) => item.id)
          }
          if (
            tabs.some((node) =>
              Array.isArray(activeKey) ? activeKey.includes(node.id) : node.id === activeKey
            )
          ) {
            return props.accordion ? activeKey[activeKey.length - 1] : activeKey
          }
          return props.accordion ? tabs[tabs.length - 1].id : [tabs[tabs.length - 1].id]
        }

        return () => {
          const node = nodeRef.value
          const nodeId = nodeIdRef.value
          const activeKey = activeKeyRef.value
          const designer = designerRef.value

          const panels = parseCollapse(node)

          const renderCollapse = () => {
            if (!node.children?.length) return <DroppableWidget />
            return (
              <Collapse
                {...attrs}
                activeKey={getCorrectActiveKey(activeKey, panels)}
                accordion={props.accordion}
              >
                {panels.map((panel) => {
                  const props = panel.props['x-component-props'] || {}
                  return (
                    <Collapse.Panel
                      {...attrs}
                      key={panel.id}
                      header={
                        <span
                          data-content-editable="x-component-props.title"
                          data-content-editable-node-id={panel.id}
                        >
                          {props.header}
                        </span>
                      }
                    >
                      <div
                        style={{
                          padding: '20px 0'
                        }}
                        {...{
                          [designer.props.nodeIdAttrName]: panel.id
                        }}
                      >
                        {/* TODO::reactive的flow，重新渲染了整个子树 */}
                        {panel.children.length ? (
                          <TreeNodeWidget node={panel} />
                        ) : (
                          <DroppableWidget node={panel} />
                        )}
                      </div>
                    </Collapse.Panel>
                  )
                })}
              </Collapse>
            )
          }
          return (
            <div {...nodeId}>
              {renderCollapse()}
              <LoadTemplate
                actions={[
                  {
                    title: node.getMessage('addCollapsePanel'),
                    icon: 'AddPanel',
                    onClick: () => {
                      const tabPane = new TreeNode({
                        componentName: 'Field',
                        props: {
                          type: 'void',
                          'x-component': 'FormCollapse.CollapsePanel',
                          'x-component-props': {
                            header: `Unnamed Title`
                          }
                        }
                      })
                      node.append(tabPane)
                      const keys = toArr(activeKey)
                      setActiveKey(keys.concat(tabPane.id))
                      nextTick(() => {
                        selectionRef.value.select(tabPane.id)
                      })
                    }
                  }
                ]}
              />
            </div>
          )
        }
      }
    })
  ),
  {
    Behavior: createBehavior(
      {
        name: 'FormCollapse',
        extends: ['Field'],
        selector: (node) => node.props['x-component'] === 'FormCollapse',
        designerProps: {
          droppable: true,
          allowAppend: (target, source) =>
            target.children.length === 0 ||
            source.every((node) => node.props['x-component'] === 'FormCollapse.CollapsePanel'),
          propsSchema: createVoidFieldSchema(AllSchemas.FormCollapse)
        },
        designerLocales: AllLocales.FormCollapse
      },
      {
        name: 'FormCollapse.CollapsePanel',
        extends: ['Field'],
        selector: (node) => node.props['x-component'] === 'FormCollapse.CollapsePanel',
        designerProps: {
          droppable: true,
          allowDrop: (node) => node.props['x-component'] === 'FormCollapse',
          propsSchema: createVoidFieldSchema(AllSchemas.FormCollapse.CollapsePanel)
        },
        designerLocales: AllLocales.FormCollapsePanel
      }
    ),
    Resource: createResource({
      icon: 'CollapseSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormCollapse'
          }
        }
      ]
    })
  }
)
