import { defineComponent, watch } from 'vue-demi'
import { GlobalRegistry } from '@designable/core'
import { Button } from 'ant-design-vue'
import { ArrayItems, Form, Input, FormItem, Space } from '@formily/antdv'
import { createForm } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { createSchemaField, FragmentComponent } from '@formily/vue'
import { ValueInput } from '@formily/antdv-settings-form'
import { usePrefix, TextWidget, IconWidget } from '@formily/antdv-designable'
import { Header } from './Header'
import { traverseTree } from './shared'
import './styles.less'
import type { PropType } from 'vue-demi'
import type { Form as FormCore, ArrayField } from '@formily/core'
import type { ITreeDataSource } from './types'

const {
  SchemaField,
  SchemaArrayField,
  SchemaObjectField,
  SchemaStringField,
  SchemaVoidField,
} = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayItems,
    ValueInput,
    Space,
  },
})

export interface IDataSettingPanelProps {
  treeDataSource: ITreeDataSource
  allowExtendOption?: boolean
  effects?: (form: FormCore<any>) => void
}

export const DataSettingPanel = observer(
  defineComponent({
    inheritAttrs: false,
    props: {
      treeDataSource: {
        type: Object as PropType<IDataSettingPanelProps['treeDataSource']>,
      },
      allowExtendOption: {
        type: Boolean as PropType<IDataSettingPanelProps['allowExtendOption']>,
      },
      effects: {
        type: Function as PropType<IDataSettingPanelProps['effects']>,
      },
    },
    setup(props) {
      const prefixRef = usePrefix('data-source-setter')
      const form = createForm({
        values: {},
        effects: props.effects,
      })
      watch(
        [
          () => props.treeDataSource.selectedKey,
          () => props.treeDataSource.dataSource,
        ],
        (value) => {
          const [selectedKey, dataSource] = value
          let values: any = {}
          traverseTree(dataSource, (dataItem) => {
            if (dataItem.key === selectedKey) {
              values = dataItem
            }
          })
          form.setValues(values, 'overwrite')
        },
        { immediate: true }
      )
      const labelStr = GlobalRegistry.getDesignerMessage(
        'SettingComponents.DataSourceSetter.label'
      )
      const valueStr = GlobalRegistry.getDesignerMessage(
        'SettingComponents.DataSourceSetter.value'
      )
      return () => {
        const prefix = prefixRef.value
        const allowExtendOption = props.allowExtendOption
        if (!props.treeDataSource?.selectedKey)
          return (
            <FragmentComponent>
              <Header
                title={
                  <TextWidget token="SettingComponents.DataSourceSetter.nodeProperty" />
                }
                extra={null}
              />
              <div class={`${prefix + '-layout-item-content'}`}>
                <TextWidget token="SettingComponents.DataSourceSetter.pleaseSelectNode" />
              </div>
            </FragmentComponent>
          )
        return (
          <FragmentComponent>
            <Header
              title={
                <TextWidget token="SettingComponents.DataSourceSetter.nodeProperty" />
              }
              extra={
                allowExtendOption ? (
                  <Button
                    text={true}
                    onClick={() =>
                      form.setFieldState('map', (state: ArrayField) => {
                        state.value.push({})
                      })
                    }
                    icon={<IconWidget infer="Add" />}
                  >
                    <TextWidget token="SettingComponents.DataSourceSetter.addKeyValuePair" />
                  </Button>
                ) : null
              }
            />
            <div class={`${prefix + '-layout-item-content'}`}>
              <Form form={form} labelWidth={60} wrapperWidth={160}>
                <SchemaField>
                  <SchemaArrayField name="map" x-component="ArrayItems">
                    <SchemaObjectField
                      x-decorator="ArrayItems.Item"
                      x-decorator-props={{ type: 'divide' }}
                    >
                      <SchemaStringField
                        title={labelStr}
                        x-decorator="FormItem"
                        x-disabled={!allowExtendOption}
                        name="label"
                        x-component="Input"
                      />
                      <SchemaStringField
                        title={valueStr}
                        x-decorator="FormItem"
                        name="value"
                        x-component="ValueInput"
                      />
                      <SchemaVoidField
                        x-component="ArrayItems.Remove"
                        x-visible={allowExtendOption}
                        x-component-props={{}}
                      />
                    </SchemaObjectField>
                  </SchemaArrayField>
                </SchemaField>
              </Form>
            </div>
          </FragmentComponent>
        )
      }
    },
  })
)
