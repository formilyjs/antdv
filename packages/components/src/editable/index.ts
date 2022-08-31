import { h, useField } from '@formily/vue'
import { defineComponent, ref, onBeforeUnmount, computed } from 'vue-demi'
import { observer } from '@formily/reactive-vue'
import { Popover as AntdPopover, Icon } from 'ant-design-vue'
import { composeExport } from '../__builtins__'
import type { FormItemProps } from '../form-item'
import { FormBaseItem } from '../form-item'
import type { Popover as PopoverProps } from 'ant-design-vue/types/popover'
import type { Field } from '@formily/core'
import { isVoidField } from '@formily/core'
import { stylePrefix } from '../__builtins__/configs'
import { reaction } from '@formily/reactive'

type IPopoverProps = PopoverProps
export type EditableProps = FormItemProps

const useInitialPattern = (fieldRef) => {
  const field = fieldRef.value
  return computed(() => field?.pattern)
}

const useFormItemProps = (fieldRef): FormItemProps => {
  const field = fieldRef.value
  if (isVoidField(field)) return {}
  if (!field) return {}
  const takeMessage = () => {
    if (field.selfErrors.length) return field.selfErrors
    if (field.selfWarnings.length) return field.selfWarnings
    if (field.selfSuccesses.length) return field.selfSuccesses
  }

  return {
    feedbackStatus:
      field.validateStatus === 'validating' ? 'pending' : field.validateStatus,
    feedbackText: takeMessage(),
    extra: field.description,
  }
}

const EditableInner = observer(
  // eslint-disable-next-line vue/one-component-per-file
  defineComponent<EditableProps>({
    name: 'Editable',
    setup(props, { attrs, slots, refs }) {
      const fieldRef = useField<Field>()
      const pattern = useInitialPattern(fieldRef)
      const prefixCls = `${stylePrefix}-editable`
      const setEditable = (payload: boolean) => {
        // console.log('pattern', pattern)
        if (pattern.value !== 'editable') return
        fieldRef.value.setPattern(payload ? 'editable' : 'readPretty')
      }

      const dispose = reaction(
        () => {
          return pattern
        },
        (pattern) => {
          if (pattern.value === 'editable') {
            fieldRef.value.setPattern('readPretty')
          }
        },
        {
          fireImmediately: true,
        }
      )

      onBeforeUnmount(() => {
        const field = fieldRef.value
        field.setPattern(pattern.value)
        dispose()
      })

      return () => {
        const field = fieldRef.value
        const editable = field.pattern === 'editable'
        const itemProps = useFormItemProps(fieldRef)

        const closeEditable = () => {
          if (editable && !fieldRef.value?.errors?.length) {
            setEditable(false)
          }
        }

        const onClick = (e: MouseEvent) => {
          const innerRef = refs.innerRef as HTMLElement
          const target = e.target as HTMLElement
          const close = innerRef.querySelector(`.${prefixCls}-close-btn`)

          if (target?.contains(close) || close?.contains(target)) {
            closeEditable()
          } else if (!editable) {
            setTimeout(() => {
              setEditable(true)
              setTimeout(() => {
                innerRef.querySelector('input')?.focus()
              })
            })
          }
        }

        const renderEditHelper = () => {
          if (editable) return
          return h(
            FormBaseItem,
            {
              attrs: {
                ...attrs,
                ...itemProps,
              },
            },
            {
              default: () => {
                return pattern.value === 'editable'
                  ? h(
                      Icon,
                      {
                        class: [`${prefixCls}-edit-btn`],
                        props: {
                          type: 'edit',
                        },
                      },
                      {}
                    )
                  : null
              },
            }
          )
        }

        const renderCloseHelper = () => {
          if (!editable) return
          return h(
            FormBaseItem,
            {
              attrs: {
                ...attrs,
              },
            },
            {
              default: () => {
                return h(
                  Icon,
                  {
                    class: [`${prefixCls}-close-btn`],
                    props: {
                      type: 'close',
                    },
                  },
                  {}
                )
              },
            }
          )
        }

        return h(
          'div',
          {
            class: prefixCls,
            ref: 'innerRef',
            on: {
              click: onClick,
            },
          },
          {
            default: () => {
              return h(
                'div',
                {
                  class: `${prefixCls}-content`,
                },
                {
                  default: () => [
                    h(
                      FormBaseItem,
                      {
                        attrs: {
                          ...attrs,
                          ...itemProps,
                        },
                      },
                      slots
                    ),
                    renderEditHelper(),
                    renderCloseHelper(),
                  ],
                }
              )
            },
          }
        )
      }
    },
  })
)

const EditablePopover = observer(
  // eslint-disable-next-line vue/one-component-per-file
  defineComponent<IPopoverProps>({
    name: 'EditablePopover',
    setup(props, { attrs, slots }) {
      const fieldRef = useField<Field>()
      const prefixCls = `${stylePrefix}-editable`
      const visible = ref(false)

      return () => {
        const field = fieldRef.value
        const pattern = useInitialPattern(fieldRef)
        return h(
          AntdPopover,
          {
            class: [prefixCls, attrs.class],
            props: {
              ...props,
              title: attrs.title || field.title,
              visible: visible.value,
              trigger: 'click',
            },
            arrrs: {
              ...attrs,
            },
            on: {
              visibleChange: (value: boolean) => {
                visible.value = value
              },
            },
          },
          {
            content: () => [slots.default()],
            default: () =>
              h(
                FormBaseItem,
                {
                  class: [`${prefixCls}-trigger`],
                },
                {
                  default: () =>
                    h(
                      'div',
                      {
                        class: [`${prefixCls}-content`],
                      },
                      {
                        default: () => [
                          h(
                            'span',
                            {
                              class: [`${prefixCls}-preview`],
                            },
                            {
                              default: () => [attrs.title || field.title],
                            }
                          ),
                          h(
                            Icon,
                            {
                              class: [`${prefixCls}-edit-btn`],
                              props: {
                                type:
                                  pattern.value === 'editable'
                                    ? 'edit'
                                    : 'message',
                              },
                            },
                            {}
                          ),
                        ],
                      }
                    ),
                }
              ),
          }
        )
      }
    },
  })
)

export const Editable = composeExport(EditableInner, {
  Popover: EditablePopover,
})

export default Editable
