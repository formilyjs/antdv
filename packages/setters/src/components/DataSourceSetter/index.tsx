import { defineComponent, ref, watch, reactive } from 'vue-demi'
import { Modal, Button, Space } from 'ant-design-vue'
import { FragmentComponent } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { usePrefix, useTheme, TextWidget } from '@formily/antdv-designable'
import { DataSettingPanel } from './DataSettingPanel'
import { TreePanel } from './TreePanel'
import { transformDataToValue, transformValueToData } from './shared'
import './styles.less'

import type { PropType } from 'vue-demi'
import type { Form } from '@formily/core'
import type { IDataSourceItem, INodeItem } from './types'

export interface IDataSourceSetterProps {
  onChange: (dataSource: IDataSourceItem[]) => void
  value: IDataSourceItem[]
  allowTree?: boolean
  allowExtendOption?: boolean
  defaultOptionValue?: {
    label: string
    value: any
  }[]
  effects?: (form: Form<any>) => void
}
export const DataSourceSetter = observer(
  defineComponent({
    props: {
      value: {
        type: Array as PropType<IDataSourceSetterProps['value']>,
        default: () => [],
      },
      allowTree: {
        type: Boolean as PropType<IDataSourceSetterProps['allowTree']>,
        default: true,
      },
      allowExtendOption: {
        type: Boolean as PropType<IDataSourceSetterProps['allowExtendOption']>,
        default: true,
      },
      defaultOptionValue: {
        type: Array as PropType<IDataSourceSetterProps['defaultOptionValue']>,
      },
      effects: {
        type: Function as PropType<IDataSourceSetterProps['effects']>,
      },
      onChange: {
        type: Function as PropType<IDataSourceSetterProps['onChange']>,
      },
    },
    inheritAttrs: false,
    emits: ['change'],
    setup(props, { emit }) {
      const prefixRef = usePrefix('data-source-setter')
      const dnAppRef = usePrefix('app')
      const themeRef = useTheme()
      const modalVisibleRef = ref(false)
      const treeDataSourceRef = reactive({
        dataSource: [],
        selectedKey: '',
      })
      watch(
        [() => props.value, modalVisibleRef],
        () => {
          treeDataSourceRef.selectedKey = ''
          treeDataSourceRef.dataSource = transformValueToData(props.value)
        },
        { immediate: true }
      )
      const openModal = () => (modalVisibleRef.value = true)
      const closeModal = () => (modalVisibleRef.value = false)
      return () => {
        const modalVisible = modalVisibleRef.value
        const treeDataSource = treeDataSourceRef
        const prefix = prefixRef.value
        return (
          <FragmentComponent>
            <Button onClick={openModal}>
              <TextWidget token="SettingComponents.DataSourceSetter.configureDataSource" />
            </Button>
            <Modal
              onCancel={closeModal}
              scopedSlots={{
                title: () => (
                  <TextWidget token="SettingComponents.DataSourceSetter.configureDataSource" />
                ),
                footer: () => (
                  <Space>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button
                      onClick={() => {
                        emit(
                          'change',
                          transformDataToValue(treeDataSource.dataSource)
                        )

                        closeModal()
                      }}
                      type="primary"
                    >
                      OK
                    </Button>
                  </Space>
                ),
              }}
              getContainer={() => document.querySelector(`.${dnAppRef.value}`)}
              visible={modalVisible}
              width="65%"
              destroyOnClose
            >
              <div
                class={[
                  prefix,
                  `${prefix + '-' + themeRef.value}`,
                  `${prefix}-layout`,
                ]}
              >
                <div class={[`${prefix}-layout-item`, 'left']}>
                  <TreePanel
                    defaultOptionValue={props.defaultOptionValue}
                    allowTree={props.allowTree}
                    treeDataSource={treeDataSource}
                    onData-source-change={(data: INodeItem[]) => {
                      treeDataSourceRef.dataSource = data
                    }}
                  ></TreePanel>
                </div>
                <div class={[`${prefix}-layout-item`, 'right']}>
                  <DataSettingPanel
                    allowExtendOption={props.allowExtendOption}
                    treeDataSource={treeDataSource}
                    effects={props.effects}
                  ></DataSettingPanel>
                </div>
              </div>
            </Modal>
          </FragmentComponent>
        )
      }
    },
  })
)
