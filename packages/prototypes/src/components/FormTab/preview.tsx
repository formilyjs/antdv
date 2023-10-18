// import React, { Fragment, useState } from 'react'
import { createBehavior, createResource, TreeNode } from '@pind/designable-core'
import { uid } from '@pind/designable-shared'
import { observer } from '@formily/reactive-vue'
import {
  DroppableWidget,
  TreeNodeWidget,
  useNodeIdProps,
  useSelection,
  useTreeNode
} from '@formily/antdv-designable'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { Tabs } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { LoadTemplate } from '../../common/LoadTemplate'
import { useDropTemplate } from '../../hooks'
import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { matchComponent } from '../../shared'
import { createVoidFieldSchema } from '../Field'
// import type { Tabs as TabsProps } from 'ant-design-vue'

const parseTabs = (parent: TreeNode) => {
  const tabs: TreeNode[] = []
  parent.children.forEach((node) => {
    if (matchComponent(node, 'FormTab.TabPane')) {
      tabs.push(node)
    }
  })
  return tabs
}

const getCorrectActiveKey = (activeKey: string, tabs: TreeNode[]) => {
  if (tabs.length === 0) return
  if (tabs.some((node) => node.id === activeKey)) return activeKey
  return tabs[tabs.length - 1].id
}
//  {
//   TabPane?: VueComponent<TabPaneProps>
// }
export const FormTab = composeExport(
  observer(
    defineComponent({
      setup(props, { attrs }) {
        const activeKeyRef = ref<string>()
        const nodeIdRef = useNodeIdProps()
        const nodeRef = useTreeNode()
        const selectionRef = useSelection()
        const designerRef = useDropTemplate('FormTab', (source) => {
          return [
            new TreeNode({
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'FormTab.TabPane',
                'x-component-props': {
                  label: `Unnamed Title`
                }
              },
              children: source
            })
          ]
        })

        const setActiveKey = (value) => {
          activeKeyRef.value = value
          selectionRef.value.select(value)
        }
        return () => {
          const activeKey = activeKeyRef.value
          const nodeId = nodeIdRef.value
          const node = nodeRef.value
          const designer = designerRef.value

          const tabs = parseTabs(node)
          const renderTabs = () => {
            if (!node.children?.length) return <DroppableWidget />
            return (
              <Tabs
                {...attrs}
                onChange={(id) => {
                  setActiveKey(id)
                }}
                activeKey={getCorrectActiveKey(activeKey, tabs)}
              >
                {tabs.map((tab) => {
                  const props = tab.props['x-component-props'] || {}
                  return (
                    <Tabs.TabPane
                      {...{
                        [designer.props.nodeIdAttrName]: tab.id
                      }}
                      style={{ ...props.style }}
                      key={tab.id}
                      tab={
                        <span
                          data-content-editable="x-component-props.tab"
                          data-content-editable-node-id={tab.id}
                        >
                          {props.tab}
                        </span>
                      }
                    >
                      <div
                        key={uid()}
                        style={{
                          padding: '20px 0'
                        }}
                      >
                        {tab.children.length ? (
                          <TreeNodeWidget node={tab} />
                        ) : (
                          <DroppableWidget node={tab} />
                        )}
                      </div>
                    </Tabs.TabPane>
                  )
                })}
              </Tabs>
            )
          }
          return (
            <div {...nodeId}>
              {renderTabs()}
              <LoadTemplate
                actions={[
                  {
                    title: node.getMessage('addTabPane'),
                    icon: 'AddPanel',
                    onClick: () => {
                      const tabPane = new TreeNode({
                        componentName: 'Field',
                        props: {
                          type: 'void',
                          'x-component': 'FormTab.TabPane',
                          'x-component-props': {
                            tab: `Unnamed Title`
                          }
                        }
                      })
                      node.append(tabPane)
                      setActiveKey(tabPane.id)
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
        name: 'FormTab',
        extends: ['Field'],
        selector: (node) => node.props['x-component'] === 'FormTab',
        designerProps: {
          droppable: true,
          allowAppend: (target, source) =>
            target.children.length === 0 ||
            source.every((node) => node.props['x-component'] === 'FormTab.TabPane'),
          propsSchema: createVoidFieldSchema(AllSchemas.FormTab)
        },
        designerLocales: AllLocales.FormTab
      },
      {
        name: 'FormTab.TabPane',
        extends: ['Field'],
        selector: (node) => node.props['x-component'] === 'FormTab.TabPane',
        designerProps: {
          droppable: true,
          allowDrop: (node) => node.props['x-component'] === 'FormTab',
          propsSchema: createVoidFieldSchema(AllSchemas.FormTab.TabPane)
        },
        designerLocales: AllLocales.FormTabPane
      }
    ),
    Resource: createResource({
      icon: 'TabSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormTab'
          }
        }
      ]
    })
  }
)
