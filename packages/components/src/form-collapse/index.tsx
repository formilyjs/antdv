import type { GeneralField } from '@formily/core'
import type { Schema, SchemaKey } from '@formily/json-schema'
import { markRaw, model } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import { toArr } from '@formily/shared'
import { RecursionField, useField, useFieldSchema } from '@formily/vue'
import type { CollapsePanelProps, CollapseProps } from 'ant-design-vue'
import { Badge, Collapse } from 'ant-design-vue'
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import { composeExport, usePrefixCls } from '../__builtins__'

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
          key: schema?.['x-component-props']?.key || name
        },
        schema
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
        formCollapse.activeKeys = formCollapse.activeKeys.filter((item) => item != key)
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
    }
  })
  return markRaw(formCollapse)
}

const _FormCollapse = observer(
  defineComponent({
    inheritAttrs: false,
    props: {
      // eslint-disable-next-line vue/require-default-prop
      formCollapse: { type: Object as PropType<IFormCollapse> },
      // eslint-disable-next-line vue/require-default-prop
      activeKey: {
        type: [String, Number]
      }
    },
    setup(props, { attrs, emit }) {
      const field = useField()
      const schema = useFieldSchema()
      const prefixCls = usePrefixCls('formily-form-collapse', attrs.prefixCls as string)
      const _formCollapse = computed(() => props.formCollapse ?? createFormCollapse())

      const takeActiveKeys = (panels: Panels) => {
        if (props.activeKey) return props.activeKey
        if (_formCollapse.value?.activeKeys) return _formCollapse.value?.activeKeys
        if (attrs.accordion) return panels[0]?.name
        return panels.map((item) => item.name)
      }

      const badgedHeader = (key: SchemaKey, header: string) => {
        const errors = field.value.form.queryFeedbacks({
          type: 'error',
          address: `${field.value.address.concat(key)}.*`
        })
        if (errors.length) {
          return (
            <Badge class={`${prefixCls}-errors-badge`} count={errors.length}>
              {header}
            </Badge>
          )
        }
        return header
      }

      return () => {
        const panels = usePanels(field.value, schema.value)
        const activeKey = takeActiveKeys(panels)
        return (
          <Collapse
            class={prefixCls}
            {...attrs}
            activeKey={activeKey}
            onChange={(key: string | string[]) => {
              emit('input', key)
              _formCollapse.value.setActiveKeys(key)
            }}
          >
            {panels.map(({ props, schema, name }) => {
              const { header, ...restProps } = props
              return (
                <Collapse.Panel
                  key={name}
                  {...restProps}
                  forceRender
                  header={badgedHeader(name, header)}
                >
                  <RecursionField schema={schema} name={name} />
                </Collapse.Panel>
              )
            })}
          </Collapse>
        )
      }
    }
  })
)

// eslint-disable-next-line vue/one-component-per-file
export const CollapsePanel = defineComponent<CollapsePanelProps>({
  name: 'FormCollapsePanel',
  setup(props, { slots }) {
    return () => <>{slots.default?.()}</>
  }
})

export const FormCollapse = composeExport(_FormCollapse, {
  CollapsePanel,
  createFormCollapse
})

export default FormCollapse
