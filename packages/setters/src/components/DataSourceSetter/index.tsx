import type { Form } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { FragmentComponent } from '@formily/vue'
import { TextWidget, usePrefix, useTheme } from '@formily/antdv-designable'
import { Button, Modal, Space } from 'ant-design-vue'
import type { PropType } from 'vue'
import { defineComponent, reactive, ref, watch } from 'vue'
import { DataSettingPanel } from './DataSettingPanel'
import { TreePanel } from './TreePanel'
import { transformDataToValue, transformValueToData } from './shared'
import './styles.less'
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
        default: () => []
      },
      allowTree: {
        type: Boolean as PropType<IDataSourceSetterProps['allowTree']>,
        default: true
      },
      allowExtendOption: {
        type: Boolean as PropType<IDataSourceSetterProps['allowExtendOption']>,
        default: true
      },
      defaultOptionValue: {
        type: Array as PropType<IDataSourceSetterProps['defaultOptionValue']>
      },
      effects: {
        type: Function as PropType<IDataSourceSetterProps['effects']>
      },
      onChange: {
        type: Function as PropType<IDataSourceSetterProps['onChange']>
      }
    },
    inheritAttrs: false,
    emits: ['change'],
    setup(props, { emit }) {
      const prefixRef = usePrefix('data-source-setter')
      const themeRef = useTheme()
      const modalOpenRef = ref(false)
      const treeDataSourceRef = reactive({
        dataSource: [],
        selectedKey: ''
      })
      watch(
        [() => props.value, modalOpenRef],
        () => {
          treeDataSourceRef.selectedKey = ''
          treeDataSourceRef.dataSource = transformValueToData(props.value)
        },
        { immediate: true }
      )
      const openModal = () => (modalOpenRef.value = true)
      const closeModal = () => (modalOpenRef.value = false)
      return () => {
        const modalOpen = modalOpenRef.value
        const treeDataSource = treeDataSourceRef
        const prefix = prefixRef.value
        return (
          <FragmentComponent>
            <Button onClick={openModal}>
              <TextWidget token="SettingComponents.DataSourceSetter.configureDataSource" />
            </Button>
            <Modal
              onCancel={closeModal}
              title={<TextWidget token="SettingComponents.DataSourceSetter.configureDataSource" />}
              footer={
                <Space>
                  <Button onClick={closeModal}>Cancel</Button>
                  <Button
                    onClick={() => {
                      emit('change', transformDataToValue(treeDataSource.dataSource))

                      closeModal()
                    }}
                    type="primary"
                  >
                    OK
                  </Button>
                </Space>
              }
              open={modalOpen}
              width="65%"
              destroyOnClose
            >
              <div class={[prefix, `${prefix + '-' + themeRef.value}`, `${prefix}-layout`]}>
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
    }
  })
)
