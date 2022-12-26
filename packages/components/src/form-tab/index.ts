import { defineComponent, reactive, computed } from 'vue-demi'
import { observer } from '@formily/reactive-vue'
import { model } from '@formily/reactive'
import { Tabs, Badge } from 'ant-design-vue'
import {
  h,
  useField,
  useFieldSchema,
  RecursionField,
  Fragment,
} from '@formily/vue'
import { stylePrefix } from '../__builtins__/configs'
import { composeExport } from '../__builtins__/shared'

import type { Schema, SchemaKey } from '@formily/json-schema'

import type { Tabs as TabsProps } from 'ant-design-vue/types/tabs/tabs'
import type { TabPane as TabPaneProps } from 'ant-design-vue/types/tabs/tab-pane'

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

const useTabs = () => {
  const tabsField = useField().value
  const schema = useFieldSchema().value
  const tabs: { name: SchemaKey; props: any; schema: Schema }[] = reactive([])
  schema.mapProperties((schema, name) => {
    const field = tabsField.query(tabsField.address.concat(name)).take()
    if (field?.display === 'none' || field?.display === 'hidden') return
    if (schema['x-component']?.indexOf('TabPane') > -1) {
      tabs.push({
        name,
        props: {
          key: schema?.['x-component-props']?.key || name,
          ...schema?.['x-component-props'],
        },
        schema,
      })
    }
  })
  return tabs
}

const createFormTab = (defaultActiveKey?: string) => {
  const formTab = model({
    activeKey: defaultActiveKey,
    setActiveKey(key: string) {
      formTab.activeKey = key
    },
  })
  return formTab
}

const FormTabInner = observer(
  // eslint-disable-next-line vue/one-component-per-file
  defineComponent<IFormTabProps>({
    name: 'FormTab',
    props: ['formTab'],
    setup(props, { attrs, listeners }) {
      const field = useField().value
      const formTabRef = computed(() => props.formTab ?? createFormTab())

      const prefixCls = `${stylePrefix}-form-tab`

      return () => {
        const formTab = formTabRef.value
        const tabs = useTabs()
        const activeKey =
          props.activeKey || formTab?.activeKey || tabs?.[0]?.name
        const badgedTab = (key: SchemaKey, props: any) => {
          const errors = field.form.queryFeedbacks({
            type: 'error',
            address: `${field.address.concat(key)}.*`,
          })
          if (errors.length) {
            return () =>
              h(
                Badge,
                {
                  class: [`${prefixCls}-errors-badge`],
                  props: {
                    count: errors.length,
                    size: 'small',
                  },
                },
                { default: () => props.tab }
              )
          }
          return props.tab
        }

        const getTabs = (tabs) => {
          return tabs.map(({ props, schema, name }) => {
            return h(
              TabPane,
              {
                key: name,
                props: {
                  ...props,
                  tab: badgedTab(name, props),
                  forceRender: true,
                },
              },
              {
                default: () => [
                  h(
                    RecursionField,
                    {
                      props: {
                        schema,
                        name,
                      },
                    },
                    {}
                  ),
                ],
              }
            )
          })
        }
        return h(
          Tabs,
          {
            class: [prefixCls],
            style: attrs.style,
            props: {
              ...attrs,
              activeKey: activeKey,
            },
            on: {
              ...listeners,
              change: (key) => {
                listeners.change?.(key)
                formTab.setActiveKey?.(key)
              },
            },
          },
          {
            default: () => getTabs(tabs),
          }
        )
      }
    },
  })
)

// eslint-disable-next-line vue/one-component-per-file
const FormTabPane = defineComponent<IFormTabPaneProps>({
  name: 'FormTabPane',
  setup(_props, { slots }) {
    return () => h(Fragment, {}, slots)
  },
})

export const FormTab = composeExport(FormTabInner, {
  TabPane: FormTabPane,
  createFormTab,
})

export default FormTab
