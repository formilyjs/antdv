import { clone, uid } from '@formily/shared'
import { GlobalRegistry } from '@designable/core'
import { requestIdle } from '@designable/shared'
import { usePrefix, TextWidget } from '@formily/antdv-designable'
import { MonacoInput } from '@formily/antdv-settings-form'
import { createForm, isVoidField } from '@formily/core'
import { createSchemaField, FragmentComponent } from '@formily/vue'
import { markRaw, ref, watch, defineComponent } from 'vue-demi'

import {
  Form,
  ArrayTable,
  Input,
  Select,
  FormItem,
  FormCollapse,
} from '@formily/antdv'
import { Modal, Card, Button, Tag, Tooltip, Space } from 'ant-design-vue'
import { PathSelector } from './PathSelector'
import { FieldPropertySetter } from './FieldPropertySetter'
import { FulfillRunHelper } from './helpers'
import { initDeclaration } from './declarations'
import './styles.less'

import type { IReaction } from './types'
import type { ISchema } from '@formily/vue'

export interface IReactionsSetterProps {
  value?: IReaction
  onChange?: (value: IReaction) => void
}

const TypeView = defineComponent({
  props: { value: { type: String } },
  setup(props) {
    return () => {
      const value = props.value
      const text = String(value)
      if (text.length <= 26)
        return (
          <Tag effect="plain" type="info" disableTransitions>
            {text}
          </Tag>
        )
      return (
        <Tag effect="plain" type="info">
          <Tooltip
            scopedSlots={{
              title: (
                <div style={{ fontSize: 12 }}>
                  <code>
                    <pre
                      style={{ whiteSpace: 'pre-wrap', padding: 0, margin: 0 }}
                    >
                      {text}
                    </pre>
                  </code>
                </div>
              ),
            }}
          >
            {text.substring(0, 24)}...
          </Tooltip>
        </Tag>
      )
    }
  },
})

const {
  SchemaField,
  SchemaVoidField,
  SchemaArrayField,
  SchemaObjectField,
  SchemaStringField,
  SchemaMarkupField,
} = createSchemaField({
  components: {
    Card,
    FormCollapse,
    Input,
    TypeView,
    Select,
    FormItem,
    PathSelector,
    FieldPropertySetter,
    ArrayTable,
    MonacoInput,
  },
})

const FieldStateProperties = [
  'value',
  'initialValue',
  'inputValue',
  'inputValues',
  'modified',
  'initialized',
  'title',
  'description',
  'mounted',
  'unmounted',
  'active',
  'visited',
  'loading',
  'errors',
  'warnings',
  'successes',
  'feedbacks',
  'valid',
  'invalid',
  'pattern',
  'display',
  'disabled',
  'readOnly',
  'readPretty',
  'visible',
  'hidden',
  'editable',
  'validateStatus',
  'validating',
]

const FieldStateValueTypes = {
  modified: 'boolean',
  initialized: 'boolean',
  title: 'string',
  description: 'string',
  mounted: 'boolean',
  unmounted: 'boolean',
  active: 'boolean',
  visited: 'boolean',
  loading: 'boolean',
  errors: 'string[]',
  warnings: 'string[]',
  successes: 'string[]',
  feedbacks: `Array<
  triggerType?: 'onInput' | 'onFocus' | 'onBlur'
  type?: 'error' | 'success' | 'warning'
  code?:
    | 'ValidateError'
    | 'ValidateSuccess'
    | 'ValidateWarning'
    | 'EffectError'
    | 'EffectSuccess'
    | 'EffectWarning'
  messages?: string[]
>
`,
  valid: 'boolean',
  invalid: 'boolean',
  pattern: "'editable' | 'disabled' | 'readOnly' | 'readPretty'",
  display: "'visible' | 'hidden' | 'none'",
  disabled: 'boolean',
  readOnly: 'boolean',
  readPretty: 'boolean',
  visible: 'boolean',
  hidden: 'boolean',
  editable: 'boolean',
  validateStatus: "'error' | 'warning' | 'success' | 'validating'",
  validating: 'boolean',
}

export const ReactionsSetter = defineComponent({
  props: { value: { type: [Array, Object] } },
  inheritAttrs: false,
  emits: ['change'],
  setup(props, { emit }) {
    const modalVisibleRef = ref(false)
    const formRef = ref()
    const formCollapseRef = ref()
    const prefixRef = usePrefix('reactions-setter')

    watch(
      [() => props.value, modalVisibleRef],
      () => {
        formRef.value = markRaw(
          createForm({
            values: clone(props.value),
          })
        )
      },
      { immediate: true }
    )

    watch(
      [modalVisibleRef],
      () => {
        formCollapseRef.value = markRaw(
          FormCollapse.createFormCollapse(['deps', 'state'])
        )
      },
      { immediate: true }
    )

    const openModal = () => (modalVisibleRef.value = true)
    const closeModal = () => (modalVisibleRef.value = false)

    watch(
      modalVisibleRef,
      (value) => {
        if (value) {
          requestIdle(
            () => {
              initDeclaration()
            },
            {
              timeout: 400,
            }
          )
        }
      },
      { immediate: true }
    )

    return () => {
      const modalVisible = modalVisibleRef.value
      const form = formRef.value
      const formCollapse = formCollapseRef.value
      const prefix = prefixRef.value
      return (
        <FragmentComponent>
          <Button onClick={openModal}>
            <TextWidget token="SettingComponents.ReactionsSetter.configureReactions" />
          </Button>
          <Modal
            onCancel={closeModal}
            scopedSlots={{
              title: () => (
                <TextWidget token="SettingComponents.ReactionsSetter.configureReactions" />
              ),
              footer: () => (
                <Space>
                  <Button onClick={closeModal}>Cancel</Button>
                  <Button
                    onClick={() => {
                      form.submit((values: ISchema['x-reactions']) => {
                        emit('change', values)
                      })
                      closeModal()
                    }}
                    type="primary"
                  >
                    OK
                  </Button>
                </Space>
              ),
            }}
            visible={modalVisible}
            width="70%"
            destroyOnClose
            top="100px"
          >
            <div class={prefix}>
              <Form form={form}>
                <SchemaField>
                  <SchemaVoidField
                    x-component="FormCollapse"
                    x-component-props={{
                      formCollapse,
                      defaultActiveKey: ['deps', 'state'],
                      style: { marginBottom: 10 },
                    }}
                  >
                    <SchemaVoidField
                      x-component="FormCollapse.CollapsePanel"
                      x-component-props={{
                        key: 'deps',
                        header: GlobalRegistry.getDesignerMessage(
                          'SettingComponents.ReactionsSetter.relationsFields'
                        ),
                      }}
                    >
                      <SchemaArrayField
                        name="dependencies"
                        default={[{}]}
                        x-component="ArrayTable"
                      >
                        <SchemaObjectField>
                          <SchemaVoidField
                            x-component="ArrayTable.Column"
                            x-component-props={{
                              title: GlobalRegistry.getDesignerMessage(
                                'SettingComponents.ReactionsSetter.sourceField'
                              ),
                              width: 240,
                            }}
                          >
                            <SchemaStringField
                              name="source"
                              x-decorator="FormItem"
                              x-component="PathSelector"
                              x-component-props={{
                                placeholder: GlobalRegistry.getDesignerMessage(
                                  'SettingComponents.ReactionsSetter.pleaseSelect'
                                ),
                              }}
                            />
                          </SchemaVoidField>
                          <SchemaVoidField
                            x-component="ArrayTable.Column"
                            x-component-props={{
                              title: GlobalRegistry.getDesignerMessage(
                                'SettingComponents.ReactionsSetter.sourceProperty'
                              ),
                              width: 200,
                            }}
                          >
                            <SchemaStringField
                              name="property"
                              default="value"
                              x-decorator="FormItem"
                              x-component="Select"
                              x-component-props={{ showSearch: true }}
                              enum={FieldStateProperties}
                            />
                          </SchemaVoidField>
                          <SchemaVoidField
                            x-component="ArrayTable.Column"
                            x-component-props={{
                              title: GlobalRegistry.getDesignerMessage(
                                'SettingComponents.ReactionsSetter.variableName'
                              ),
                              width: 200,
                            }}
                          >
                            <SchemaStringField
                              name="name"
                              x-decorator="FormItem"
                              x-validator={{
                                pattern: /^[$_a-zA-Z]+[$_a-zA-Z0-9]*$/,
                                message: GlobalRegistry.getDesignerMessage(
                                  'SettingComponents.ReactionsSetter.variableNameValidateMessage'
                                ),
                              }}
                              x-component="Input"
                              x-component-props={{
                                addonBefore: '$deps.',
                                placeholder: GlobalRegistry.getDesignerMessage(
                                  'SettingComponents.ReactionsSetter.pleaseInput'
                                ),
                              }}
                              x-reactions={(field) => {
                                if (isVoidField(field)) return
                                field.query('.source').take((source) => {
                                  if (isVoidField(source)) return
                                  if (
                                    source.value &&
                                    !field.value &&
                                    !field.modified
                                  ) {
                                    field.value =
                                      source.inputValues[1]?.props?.name ||
                                      `v_${uid()}`
                                  }
                                })
                              }}
                            />
                          </SchemaVoidField>

                          <SchemaVoidField
                            x-component="ArrayTable.Column"
                            x-component-props={{
                              title: GlobalRegistry.getDesignerMessage(
                                'SettingComponents.ReactionsSetter.variableType'
                              ),
                              ellipsis: {
                                showTitle: false,
                              },
                              width: 200,
                              align: 'center',
                            }}
                          >
                            <SchemaStringField
                              name="type"
                              default="any"
                              x-decorator="FormItem"
                              x-component="TypeView"
                              x-reactions={(field) => {
                                if (isVoidField(field)) return
                                const property = field
                                  .query('.property')
                                  .get('inputValues')
                                if (!property) return
                                property[0] = property[0] || 'value'
                                field.query('.source').take((source) => {
                                  if (isVoidField(source)) return
                                  if (source.value) {
                                    if (
                                      property[0] === 'value' ||
                                      property[0] === 'initialValue' ||
                                      property[0] === 'inputValue'
                                    ) {
                                      field.value =
                                        source.inputValues[1]?.props?.type ||
                                        'any'
                                    } else if (property[0] === 'inputValues') {
                                      field.value = `any[]`
                                    } else if (property[0]) {
                                      field.value =
                                        FieldStateValueTypes[property[0]]
                                    } else {
                                      field.value = 'any'
                                    }
                                  }
                                })
                              }}
                            />
                          </SchemaVoidField>
                          <SchemaVoidField
                            x-component="ArrayTable.Column"
                            x-component-props={{
                              title: GlobalRegistry.getDesignerMessage(
                                'SettingComponents.ReactionsSetter.operations'
                              ),
                              align: 'center',
                              width: 80,
                            }}
                          >
                            <SchemaMarkupField
                              type="void"
                              x-component="ArrayTable.Remove"
                            />
                          </SchemaVoidField>
                        </SchemaObjectField>
                        <SchemaVoidField
                          title={GlobalRegistry.getDesignerMessage(
                            'SettingComponents.ReactionsSetter.addRelationField'
                          )}
                          x-component="ArrayTable.Addition"
                          x-component-props={{ style: { marginTop: 8 } }}
                        />
                      </SchemaArrayField>
                    </SchemaVoidField>

                    <SchemaVoidField
                      x-component="FormCollapse.CollapsePanel"
                      x-component-props={{
                        header: GlobalRegistry.getDesignerMessage(
                          'SettingComponents.ReactionsSetter.propertyReactions'
                        ),
                        key: 'state',
                        className: 'reaction-state',
                      }}
                    >
                      <SchemaMarkupField
                        name="fulfill.state"
                        x-component="FieldPropertySetter"
                      />
                    </SchemaVoidField>
                    <SchemaVoidField
                      x-component="FormCollapse.CollapsePanel"
                      x-component-props={{
                        key: 'run',
                        header: GlobalRegistry.getDesignerMessage(
                          'SettingComponents.ReactionsSetter.actionReactions'
                        ),
                        className: 'reaction-runner',
                      }}
                    >
                      <SchemaStringField
                        name="fulfill.run"
                        x-component="MonacoInput"
                        x-component-props={{
                          width: '100%',
                          height: 400,
                          language: 'typescript',
                          helpCode: FulfillRunHelper,
                          options: {
                            minimap: {
                              enabled: false,
                            },
                          },
                        }}
                        x-reactions={(field) => {
                          const deps = field.query('dependencies').value()
                          if (Array.isArray(deps)) {
                            field.componentProps.extraLib = `
                          declare var $deps : {
                            ${deps.map(({ name, type }) => {
                              if (!name) return ''
                              return `${name}?:${type || 'any'},`
                            })}
                          }
                          `
                          }
                        }}
                      />
                    </SchemaVoidField>
                  </SchemaVoidField>
                </SchemaField>
              </Form>
            </div>
          </Modal>
        </FragmentComponent>
      )
    }
  },
})
