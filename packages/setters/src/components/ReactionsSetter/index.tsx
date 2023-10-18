import { GlobalRegistry } from '@pind/designable-core'
import { requestIdle } from '@pind/designable-shared'
import { createForm, isVoidField } from '@formily/core'
import { clone, uid } from '@formily/shared'
import type { ISchema } from '@formily/vue'
import { FragmentComponent, createSchemaField } from '@formily/vue'
import { ArrayTable, Form, FormCollapse, FormItem, Input, Select } from '@formily/antdv'
import { TextWidget, usePrefix } from '@formily/antdv-designable'
import { MonacoInput } from '@formily/antdv-settings-form'
import { Button, Card, Modal, Space, Tag, Tooltip } from 'ant-design-vue'
import { defineComponent, markRaw, ref, watch } from 'vue'
import { FieldPropertySetter } from './FieldPropertySetter'
import { PathSelector } from './PathSelector'
import { initDeclaration } from './declarations'
import { FulfillRunHelper } from './helpers'
import './styles.less'
import type { IReaction } from './types'

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
      if (text.length <= 26) return <Tag>{text}</Tag>
      return (
        <Tag>
          <Tooltip
            title={
              <div style={{ fontSize: 12 }}>
                <code>
                  <pre style={{ whiteSpace: 'pre-wrap', padding: 0, margin: 0 }}>{text}</pre>
                </code>
              </div>
            }
          >
            {text.substring(0, 24)}...
          </Tooltip>
        </Tag>
      )
    }
  }
})

const {
  SchemaField,
  SchemaVoidField,
  SchemaArrayField,
  SchemaObjectField,
  SchemaStringField,
  SchemaMarkupField
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
    MonacoInput
  }
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
  'validating'
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
  validating: 'boolean'
}

export const ReactionsSetter = defineComponent({
  props: { value: { type: [Array, Object] } },
  inheritAttrs: false,
  emits: ['change'],
  setup(props, { emit }) {
    const modalOpenRef = ref(false)
    const formRef = ref()
    const formCollapseRef = ref()
    const prefixRef = usePrefix('reactions-setter')

    watch(
      [() => props.value, modalOpenRef],
      () => {
        formRef.value = markRaw(
          createForm({
            values: clone(props.value)
          })
        )
      },
      { immediate: true }
    )

    watch(
      [modalOpenRef],
      () => {
        formCollapseRef.value = markRaw(FormCollapse.createFormCollapse(['deps', 'state']))
      },
      { immediate: true }
    )

    const openModal = () => (modalOpenRef.value = true)
    const closeModal = () => (modalOpenRef.value = false)

    watch(
      modalOpenRef,
      (value) => {
        if (value) {
          requestIdle(
            () => {
              initDeclaration()
            },
            {
              timeout: 400
            }
          )
        }
      },
      { immediate: true }
    )

    return () => {
      const modalOpen = modalOpenRef.value
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
            open={modalOpen}
            width="70%"
            destroyOnClose
            title={<TextWidget token="SettingComponents.ReactionsSetter.configureReactions" />}
            footer={
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
            }
          >
            <div class={prefix}>
              <Form form={form}>
                <SchemaField>
                  <SchemaVoidField
                    x-component="FormCollapse"
                    x-component-
                    {...{
                      formCollapse,
                      defaultActiveKey: ['deps', 'state'],
                      style: { marginBottom: 10 }
                    }}
                  >
                    <SchemaVoidField
                      x-component="FormCollapse.CollapsePanel"
                      x-component-
                      {...{
                        key: 'deps',
                        header: GlobalRegistry.getDesignerMessage(
                          'SettingComponents.ReactionsSetter.relationsFields'
                        )
                      }}
                    >
                      <SchemaArrayField name="dependencies" default={[{}]} x-component="ArrayTable">
                        <SchemaObjectField>
                          <SchemaVoidField
                            x-component="ArrayTable.Column"
                            x-component-
                            {...{
                              title: GlobalRegistry.getDesignerMessage(
                                'SettingComponents.ReactionsSetter.sourceField'
                              ),
                              width: 240
                            }}
                          >
                            <SchemaStringField
                              name="source"
                              x-decorator="FormItem"
                              x-component="PathSelector"
                              x-component-
                              {...{
                                placeholder: GlobalRegistry.getDesignerMessage(
                                  'SettingComponents.ReactionsSetter.pleaseSelect'
                                )
                              }}
                            />
                          </SchemaVoidField>
                          <SchemaVoidField
                            x-component="ArrayTable.Column"
                            x-component-
                            {...{
                              title: GlobalRegistry.getDesignerMessage(
                                'SettingComponents.ReactionsSetter.sourceProperty'
                              ),
                              width: 200
                            }}
                          >
                            <SchemaStringField
                              name="property"
                              default="value"
                              x-decorator="FormItem"
                              x-component="Select"
                              x-component-
                              {...{ showSearch: true }}
                              enum={FieldStateProperties}
                            />
                          </SchemaVoidField>
                          <SchemaVoidField
                            x-component="ArrayTable.Column"
                            x-component-
                            {...{
                              title: GlobalRegistry.getDesignerMessage(
                                'SettingComponents.ReactionsSetter.variableName'
                              ),
                              width: 200
                            }}
                          >
                            <SchemaStringField
                              name="name"
                              x-decorator="FormItem"
                              x-validator={{
                                pattern: /^[$_a-zA-Z]+[$_a-zA-Z0-9]*$/,
                                message: GlobalRegistry.getDesignerMessage(
                                  'SettingComponents.ReactionsSetter.variableNameValidateMessage'
                                )
                              }}
                              x-component="Input"
                              x-component-
                              {...{
                                addonBefore: '$deps.',
                                placeholder: GlobalRegistry.getDesignerMessage(
                                  'SettingComponents.ReactionsSetter.pleaseInput'
                                )
                              }}
                              x-reactions={(field) => {
                                if (isVoidField(field)) return
                                field.query('.source').take((source) => {
                                  if (isVoidField(source)) return
                                  if (source.value && !field.value && !field.modified) {
                                    field.value = source.inputValues[1]?.props?.name || `v_${uid()}`
                                  }
                                })
                              }}
                            />
                          </SchemaVoidField>

                          <SchemaVoidField
                            x-component="ArrayTable.Column"
                            x-component-
                            {...{
                              title: GlobalRegistry.getDesignerMessage(
                                'SettingComponents.ReactionsSetter.variableType'
                              ),
                              ellipsis: {
                                showTitle: false
                              },
                              width: 200,
                              align: 'center'
                            }}
                          >
                            <SchemaStringField
                              name="type"
                              default="any"
                              x-decorator="FormItem"
                              x-component="TypeView"
                              x-reactions={(field) => {
                                if (isVoidField(field)) return
                                const property = field.query('.property').get('inputValues')
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
                                      field.value = source.inputValues[1]?.props?.type || 'any'
                                    } else if (property[0] === 'inputValues') {
                                      field.value = `any[]`
                                    } else if (property[0]) {
                                      field.value = FieldStateValueTypes[property[0]]
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
                            x-component-
                            {...{
                              title: GlobalRegistry.getDesignerMessage(
                                'SettingComponents.ReactionsSetter.operations'
                              ),
                              align: 'center',
                              width: 80
                            }}
                          >
                            <SchemaMarkupField type="void" x-component="ArrayTable.Remove" />
                          </SchemaVoidField>
                        </SchemaObjectField>
                        <SchemaVoidField
                          title={GlobalRegistry.getDesignerMessage(
                            'SettingComponents.ReactionsSetter.addRelationField'
                          )}
                          x-component="ArrayTable.Addition"
                          x-component-
                          {...{ style: { marginTop: 8 } }}
                        />
                      </SchemaArrayField>
                    </SchemaVoidField>

                    <SchemaVoidField
                      x-component="FormCollapse.CollapsePanel"
                      x-component-
                      {...{
                        header: GlobalRegistry.getDesignerMessage(
                          'SettingComponents.ReactionsSetter.propertyReactions'
                        ),
                        key: 'state',
                        className: 'reaction-state'
                      }}
                    >
                      <SchemaMarkupField name="fulfill.state" x-component="FieldPropertySetter" />
                    </SchemaVoidField>
                    <SchemaVoidField
                      x-component="FormCollapse.CollapsePanel"
                      x-component-
                      {...{
                        key: 'run',
                        header: GlobalRegistry.getDesignerMessage(
                          'SettingComponents.ReactionsSetter.actionReactions'
                        ),
                        className: 'reaction-runner'
                      }}
                    >
                      <SchemaStringField
                        name="fulfill.run"
                        x-component="MonacoInput"
                        x-component-
                        {...{
                          width: '100%',
                          height: 400,
                          language: 'typescript',
                          helpCode: FulfillRunHelper,
                          options: {
                            minimap: {
                              enabled: false
                            }
                          }
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
  }
})
