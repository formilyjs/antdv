import { Collapse, Badge } from 'ant-design-vue'
import { model, markRaw } from '@formily/reactive'
import type { Collapse as CollapseProps } from 'ant-design-vue/types/collapse/collapse'
import type { CollapsePanel as CollapsePanelProps } from 'ant-design-vue/types/collapse/collapse-panel'
import {
  useField,
  useFieldSchema,
  RecursionField,
  h,
  Fragment,
} from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import type { Schema, SchemaKey } from '@formily/json-schema'
import type { PropType } from 'vue-demi'
import { computed, defineComponent } from '@vue/composition-api'
import { toArr } from '@formily/shared'
import { composeExport, stylePrefix } from '../__builtins__'
import type { GeneralField } from '@formily/core'

type ActiveKeys = string | number | Array<string | number>

type ActiveKey = string | number

export interface IFormCollapse {
  activeKeys: ActiveKeys
  hasActiveKey(key: ActiveKey): boolean
  setActiveKeys(key: ActiveKeys): void
  addActiveKey(key: ActiveKey): void
  removeActiveKey(key: ActiveKey): void
  toggleActiveKey(key: ActiveKey): void
}

export interface IFormCollapseProps extends CollapseProps {
  formCollapse?: IFormCollapse
}

type Panels = { name: SchemaKey; props: any; schema: Schema }[]

const usePanels = (collapseField: GeneralField, schema: Schema) => {
  const panels: Panels = []
  schema.mapProperties((schema, name) => {
    const field = collapseField.query(collapseField.address.concat(name)).take()
    if (field?.display === 'none' || field?.display === 'hidden') return
    if (schema['x-component']?.indexOf('CollapsePanel') > -1) {
      panels.push({
        name,
        props: {
          ...schema?.['x-component-props'],
          key: schema?.['x-component-props']?.key || name,
        },
        schema,
      })
    }
  })
  return panels
}

const createFormCollapse = (defaultActiveKeys?: ActiveKeys) => {
  const formCollapse = model({
    activeKeys: defaultActiveKeys,
    setActiveKeys(keys: ActiveKeys) {
      formCollapse.activeKeys = keys
    },
    hasActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        if (formCollapse.activeKeys.includes(key)) {
          return true
        }
      } else if (formCollapse.activeKeys == key) {
        return true
      }
      return false
    },
    addActiveKey(key: ActiveKey) {
      if (formCollapse.hasActiveKey(key)) return
      formCollapse.activeKeys = toArr(formCollapse.activeKeys).concat(key)
    },
    removeActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        formCollapse.activeKeys = formCollapse.activeKeys.filter(
          (item) => item != key
        )
      } else {
        formCollapse.activeKeys = ''
      }
    },
    toggleActiveKey(key: ActiveKey) {
      if (formCollapse.hasActiveKey(key)) {
        formCollapse.removeActiveKey(key)
      } else {
        formCollapse.addActiveKey(key)
      }
    },
  })
  return markRaw(formCollapse)
}

const _FormCollapse = observer(
  // eslint-disable-next-line vue/one-component-per-file
  defineComponent<IFormCollapseProps>({
    inheritAttrs: false,
    props: {
      // eslint-disable-next-line vue/require-default-prop
      formCollapse: { type: Object as PropType<IFormCollapse> },
      // eslint-disable-next-line vue/require-default-prop
      activeKey: {
        type: [String, Number],
      },
    },
    setup(props, { attrs, emit }) {
      const field = useField()
      const schema = useFieldSchema()
      const prefixCls = `${stylePrefix}-form-collapse`
      const _formCollapse = computed(
        () => props.formCollapse ?? createFormCollapse()
      )

      const takeActiveKeys = (panels: Panels) => {
        if (props.activeKey) return props.activeKey
        if (_formCollapse.value?.activeKeys)
          return _formCollapse.value?.activeKeys
        if (attrs.accordion) return panels[0]?.name
        return panels.map((item) => item.name)
      }

      const badgedHeader = (key: SchemaKey, header: string) => {
        const errors = field.value.form.queryFeedbacks({
          type: 'error',
          address: `${field.value.address.concat(key)}.*`,
        })
        if (errors.length) {
          return h(
            Badge,
            {
              class: [`${prefixCls}-errors-badge`],
              props: {
                count: errors.length,
              },
            },
            { default: () => [header] }
          )
        }
        return header
      }

      return () => {
        const panels = usePanels(field.value, schema.value)
        const activeKey = takeActiveKeys(panels)
        return h(
          Collapse,
          {
            class: prefixCls,
            props: {
              ...props,
              activeKey,
            },
            on: {
              change: (key: string | string[]) => {
                emit('input', key)
                _formCollapse.value.setActiveKeys(key)
              },
            },
          },
          {
            default: () => {
              return panels.map(({ props, schema, name }) => {
                const { header, ...restProps } = props
                return h(
                  Collapse.Panel,
                  {
                    key: name,
                    props: {
                      ...restProps,
                      name,
                      forceRender: true,
                    },
                  },
                  {
                    default: () => [
                      h(RecursionField, { props: { schema, name } }, {}),
                    ],
                    header: () =>
                      h(
                        Fragment,
                        {},
                        {
                          default: () => badgedHeader(name, header),
                        }
                      ),
                  }
                )
              })
            },
          }
        )
      }
    },
  })
)

// eslint-disable-next-line vue/one-component-per-file
export const CollapsePanel = defineComponent<CollapsePanelProps>({
  name: 'FormCollapsePanel',
  setup(props, { slots }) {
    return () => h(Fragment, {}, slots)
  },
})

export const FormCollapse = composeExport(_FormCollapse, {
  CollapsePanel,
  createFormCollapse,
})

export default FormCollapse
