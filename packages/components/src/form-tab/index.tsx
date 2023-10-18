import type { GeneralField } from '@formily/core'
import type { Schema, SchemaKey } from '@formily/json-schema'
import { model } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import { RecursionField, useField, useFieldSchema } from '@formily/vue'
import type { TabPaneProps, TabsProps } from 'ant-design-vue'
import { Badge, Tabs } from 'ant-design-vue'
import { computed, defineComponent, reactive, watchEffect } from 'vue'
import { composeExport, usePrefixCls } from '../__builtins__'

const { TabPane } = Tabs

export interface IFormTab {
  activeKey: string
  setActiveKey(key: string): void
}

export interface IFormTabProps extends TabsProps {
  formTab?: IFormTab
}

export interface IFormTabPaneProps extends TabPaneProps {
  key: string
}

interface ITab {
  name: SchemaKey
  props: any
  schema: Schema
  field: GeneralField
}

const useTabs = () => {
  const tabsFieldRef = useField()
  const schemaRef = useFieldSchema()
  const tabs: ITab[] = reactive([])
  watchEffect(() => {
    schemaRef.value.mapProperties((schema, name) => {
      const field = tabsFieldRef.value.query(tabsFieldRef.value.address.concat(name)).take()
      if (field?.display === 'none' || field?.display === 'hidden') return
      if (schema['x-component']?.indexOf('TabPane') > -1) {
        tabs.push({
          name,
          props: {
            key: schema?.['x-component-props']?.key || name,
            ...schema?.['x-component-props'],
            ...field?.componentProps
          },
          schema,
          field
        })
      }
    })
  })
  return tabs
}

const createFormTab = (defaultActiveKey?: string) => {
  const formTab = model({
    activeKey: defaultActiveKey,
    setActiveKey(key: string) {
      formTab.activeKey = key
    }
  })
  return formTab
}

const FormTabInner = observer(
  defineComponent({
    name: 'FormTab',
    props: ['formTab', 'activeKey'],
    emits: ['change'],
    setup(props, { attrs, emit }) {
      const field = useField().value
      const formTabRef = computed(() => props.formTab ?? createFormTab())

      const prefixCls = usePrefixCls('formily-form-tab', attrs.prefixCls as string)
      const tabs = useTabs()

      return () => {
        const formTab = formTabRef.value
        const activeKey = props.activeKey || formTab?.activeKey || tabs?.[0]?.name
        const badgedTab = (key: SchemaKey, props: any) => {
          const errors = field.form.queryFeedbacks({
            type: 'error',
            address: `${field.address.concat(key)}.*`
          })
          if (errors.length) {
            return () => (
              <Badge class={`${prefixCls}-errors-badge`} count={errors.length} size="small">
                {props.tab}
              </Badge>
            )
          }
          return props.tab
        }

        const getTabs = (tabs: ITab[]) => {
          return tabs.map(({ props, schema, name }) => {
            return (
              <TabPane {...props} key={name} tab={badgedTab(name, props)} forceRender>
                <RecursionField schema={schema} name={name}></RecursionField>
              </TabPane>
            )
          })
        }
        return (
          <Tabs
            class={prefixCls}
            {...attrs}
            activeKey={activeKey}
            onChange={(key: string) => {
              emit('change', key)
              formTab.setActiveKey?.(key)
            }}
          >
            {getTabs(tabs)}
          </Tabs>
        )
      }
    }
  })
)

const FormTabPane = defineComponent<IFormTabPaneProps>({
  name: 'FormTabPane',
  setup(_props, { slots }) {
    return () => <>{slots.default?.()}</>
  }
})

export const FormTab = composeExport(FormTabInner, {
  TabPane: FormTabPane,
  createFormTab
})

export default FormTab
