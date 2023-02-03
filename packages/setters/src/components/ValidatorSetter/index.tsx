import { defineComponent, unref } from 'vue-demi'
import { useField, createSchemaField, FragmentComponent } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { GlobalRegistry } from '@designable/core'
import { createForm } from '@formily/vue'
import {
  ArrayItems,
  FormItem,
  Input,
  Space,
  Select,
  Switch,
  Form,
  InputNumber,
} from '@formily/antdv'
import { FoldItem } from '@formily/antdv-settings-form'
import { DrawerSetter, ValueInput } from '@formily/antdv-settings-form'
import { Select as ASelect } from 'ant-design-vue'
import { onFormInputChange } from '@formily/core'
import type { ArrayField } from '@formily/core'
import type { ISchema } from '@formily/json-schema'
export interface IValidatorSetterProps {
  value?: any
  onChange?: (value: any) => void
}

const { SchemaField } = createSchemaField({
  components: {
    ArrayItems,
    FormItem,
    Input,
    Space,
    Select,
    Switch,
    InputNumber,
    DrawerSetter,
    ValueInput,
  },
})

export const ValidatorSetter = observer(
  defineComponent({
    props: ['value', 'onChange'],
    emits: ['change'],
    setup(props, { emit }) {
      const fieldRef = useField<ArrayField>()
      const form = createForm({
        effects() {
          onFormInputChange((res) => {
            const decorator = res.values?.array || []
            props.onChange?.(decorator)
            emit('change', decorator)
          })
        },
      })

      // TIPS: 放在组件外面，如果语言设置置后会导致多语言无效
      const ValidatorSchema: ISchema = {
        type: 'void',
        properties: {
          array: {
            type: 'array',
            'x-component': 'ArrayItems',
            items: {
              type: 'object',
              'x-decorator': 'ArrayItems.Item',
              'x-decorator-props': {
                style: {
                  alignItems: 'center',
                  borderRadius: '3px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                },
              },
              properties: {
                sortable: {
                  type: 'void',
                  'x-component': 'ArrayItems.SortHandle',
                  'x-component-props': { style: { marginRight: '10px' } },
                },
                drawer: {
                  type: 'void',
                  'x-component': 'DrawerSetter',
                  title: GlobalRegistry.getDesignerMessage(
                    'settings.x-validator.drawer'
                  ),
                  properties: {
                    triggerType: {
                      type: 'string',
                      title: GlobalRegistry.getDesignerMessage(
                        'settings.x-validator.triggerType.title'
                      ),
                      enum: GlobalRegistry.getDesignerMessage(
                        'settings.x-validator.triggerType.dataSource'
                      ),
                      'x-decorator': 'FormItem',
                      'x-component': 'Select',
                      'x-component-props': {
                        placeholder: GlobalRegistry.getDesignerMessage(
                          'settings.x-validator.triggerType.placeholder'
                        ),
                      },
                    },
                    validator: {
                      type: 'string',
                      title: GlobalRegistry.getDesignerMessage(
                        'settings.x-validator.validator.title'
                      ),
                      'x-decorator': 'FormItem',
                      'x-component': 'ValueInput',
                      'x-component-props': {
                        include: ['EXPRESSION'],
                      },
                    },
                    message: {
                      type: 'string',
                      title: GlobalRegistry.getDesignerMessage(
                        'settings.x-validator.message.title'
                      ),
                      'x-decorator': 'FormItem',
                      'x-component': 'Input.TextArea',
                    },
                    format: {
                      type: 'string',
                      title: GlobalRegistry.getDesignerMessage(
                        'settings.x-validator.format.title'
                      ),
                      'x-decorator': 'FormItem',
                      'x-component': 'Select',
                      'x-component-props': {
                        allowClear: true,
                        placeholder: GlobalRegistry.getDesignerMessage(
                          'settings.x-validator.format.placeholder'
                        ),
                      },
                    },
                    pattern: {
                      type: 'string',
                      title: GlobalRegistry.getDesignerMessage(
                        'settings.x-validator.pattern'
                      ),
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                      'x-component-props': {
                        prefix: '/',
                        suffix: '/',
                      },
                    },
                    len: {
                      type: 'string',
                      title: GlobalRegistry.getDesignerMessage(
                        'settings.x-validator.len'
                      ),
                      'x-decorator': 'FormItem',
                      'x-component': 'InputNumber',
                    },
                    max: {
                      title: GlobalRegistry.getDesignerMessage(
                        'settings.x-validator.max'
                      ),
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'InputNumber',
                    },
                    min: {
                      type: 'string',
                      title: GlobalRegistry.getDesignerMessage(
                        'settings.x-validator.min'
                      ),
                      'x-decorator': 'FormItem',
                      'x-component': 'InputNumber',
                    },
                    exclusiveMaximum: {
                      type: 'string',
                      title: GlobalRegistry.getDesignerMessage(
                        'settings.x-validator.exclusiveMaximum'
                      ),
                      'x-decorator': 'FormItem',
                      'x-component': 'InputNumber',
                    },
                    exclusiveMinimum: {
                      type: 'string',
                      title: GlobalRegistry.getDesignerMessage(
                        'settings.x-validator.exclusiveMinimum'
                      ),
                      'x-decorator': 'FormItem',
                      'x-component': 'InputNumber',
                    },
                    whitespace: {
                      type: 'string',
                      title: GlobalRegistry.getDesignerMessage(
                        'settings.x-validator.whitespace'
                      ),
                      'x-decorator': 'FormItem',
                      'x-component': 'Switch',
                    },
                    required: {
                      type: 'string',
                      title: GlobalRegistry.getDesignerMessage(
                        'settings.x-validator.required'
                      ),
                      'x-decorator': 'FormItem',
                      'x-component': 'Switch',
                    },
                  },
                },
                moveDown: {
                  type: 'void',
                  'x-component': 'ArrayItems.MoveDown',
                  'x-component-props': { style: { marginLeft: '10px' } },
                },
                moveUp: {
                  type: 'void',
                  'x-component': 'ArrayItems.MoveUp',
                  'x-component-props': { style: { marginLeft: '5px' } },
                },
                remove: {
                  type: 'void',
                  'x-component': 'ArrayItems.Remove',
                  'x-component-props': { style: { marginLeft: '5px' } },
                },
              },
            },
            properties: {
              addValidatorRules: {
                type: 'void',
                'x-component': 'ArrayItems.Addition',
                title: GlobalRegistry.getDesignerMessage(
                  'settings.x-validator.addValidatorRules'
                ),
              },
            },
          },
        },
      }

      return () => {
        const field = unref(fieldRef)
        return (
          <FoldItem
            label={field.title}
            scopedSlots={{
              base: () => (
                <ASelect
                  value={Array.isArray(props.value) ? undefined : props.value}
                  onChange={(value) => {
                    props.onChange?.(value)
                    emit('change', value)
                  }}
                  clearable={true}
                  options={GlobalRegistry.getDesignerMessage(
                    'SettingComponents.ValidatorSetter.formats'
                  )}
                  placeholder={GlobalRegistry.getDesignerMessage(
                    'SettingComponents.ValidatorSetter.pleaseSelect'
                  )}
                ></ASelect>
              ),
              extra: () => (
                <Form form={form}>
                  <SchemaField schema={ValidatorSchema}></SchemaField>
                </Form>
              ),
            }}
          ></FoldItem>
        )
      }
    },
  })
)
