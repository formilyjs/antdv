import { defineComponent } from 'vue-demi'
import { Tree, Button } from 'ant-design-vue'
import { GlobalRegistry } from '@designable/core'
import { uid } from '@formily/shared'
import { observer } from '@formily/reactive-vue'
import { FragmentComponent } from '@formily/vue'
import { IconWidget, TextWidget, usePrefix } from '@formily/antdv-designable'
import { traverseTree } from './shared'
import { Title } from './Title'
import { Header } from './Header'
import './styles.less'

import type { ITreeDataSource, INodeItem } from './types'
import type { PropType } from 'vue-demi'

export interface ITreePanelProps {
  treeDataSource: ITreeDataSource
  allowTree: boolean
  defaultOptionValue: {
    label: string
    value: any
  }[]
}

export const TreePanel = observer(
  defineComponent({
    emits: ['data-source-change'],
    props: {
      treeDataSource: {
        type: Object as PropType<ITreePanelProps['treeDataSource']>,
      },
      allowTree: { type: Boolean as PropType<ITreePanelProps['allowTree']> },
      defaultOptionValue: {
        type: Object as PropType<ITreePanelProps['defaultOptionValue']>,
      },
    },
    setup(props, { emit }) {
      const prefixRef = usePrefix('data-source-setter')
      const dropHandler = (info: any) => {
        const dropKey = info.node?.eventKey
        const dragKey = info.dragNode?.eventKey
        const dropPos = info.node.pos.split('-')
        const dropPosition =
          info.dropPosition - Number(dropPos[dropPos.length - 1])
        const data = [...props.treeDataSource.dataSource]
        // Find dragObject
        let dragObj: INodeItem
        traverseTree(data, (item, index, arr) => {
          if (arr[index].key === dragKey) {
            arr.splice(index, 1)
            dragObj = item
          }
        })
        if (!info.dropToGap) {
          traverseTree(data, (item) => {
            if (item.key === dropKey) {
              item.children = item.children || []
              item.children.unshift(dragObj)
            }
          })
        } else if (
          (info.node.children || []).length > 0 &&
          info.node.expanded &&
          dropPosition === 1
        ) {
          traverseTree(data, (item) => {
            if (item.key === dropKey) {
              item.children = item.children || []
              item.children.unshift(dragObj)
            }
          })
        } else {
          let ar: any[]
          let i: number
          traverseTree(data, (item, index, arr) => {
            if (item.key === dropKey) {
              ar = arr
              i = index
            }
          })
          if (dropPosition === -1) {
            ar.splice(i, 0, dragObj)
          } else {
            ar.splice(i + 1, 0, dragObj)
          }
        }
        emit('data-source-change', data)
      }
      return () => {
        const prefix = prefixRef.value
        return (
          <FragmentComponent>
            <Header
              title={
                <TextWidget token="SettingComponents.DataSourceSetter.dataSourceTree" />
              }
              extra={
                <Button
                  text={true}
                  onClick={() => {
                    const uuid = uid()
                    const dataSource = props.treeDataSource!.dataSource
                    const initialKeyValuePairs = props.defaultOptionValue?.map(
                      (item) => ({ ...item })
                    ) || [
                      {
                        label: 'label',
                        value: `${GlobalRegistry.getDesignerMessage(
                          `SettingComponents.DataSourceSetter.item`
                        )} ${dataSource.length + 1}`,
                      },
                      { label: 'value', value: uuid },
                    ]
                    props.treeDataSource!.dataSource = dataSource.concat({
                      key: uuid,
                      duplicateKey: uuid,
                      map: initialKeyValuePairs,
                      children: [],
                    })
                  }}
                >
                  <IconWidget infer="Add" />
                  <TextWidget token="SettingComponents.DataSourceSetter.addNode" />
                </Button>
              }
            />
            <div class={`${prefix + '-layout-item-content'}`}>
              <Tree
                defaultExpandAll
                autoExpandParent
                showLine={true}
                draggable={true}
                treeData={props.treeDataSource!.dataSource}
                onDragenter={() => ({})}
                onDrop={dropHandler}
                onSelect={(selectedKeys: string) => {
                  if (selectedKeys[0]) {
                    props.treeDataSource!.selectedKey =
                      selectedKeys[0].toString()
                  }
                }}
                scopedSlots={{
                  title: function (titleProps) {
                    return (
                      <Title
                        attrs={{
                          ...titleProps,
                          treeDataSource: props.treeDataSource,
                        }}
                      ></Title>
                    )
                  },
                }}
              ></Tree>
            </div>
          </FragmentComponent>
        )
      }
    },
  })
)
