import { CloseCircleOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons-vue'
import type { Field } from '@formily/core'
import { isVoidField } from '@formily/core'
import { reaction } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import { useField } from '@formily/vue'
import { Popover } from 'ant-design-vue'
import type { Ref } from 'vue'
import { computed, defineComponent, nextTick, onBeforeUnmount, ref } from 'vue'
import { composeExport, usePrefixCls } from '../__builtins__'
import type { FormItemProps } from '../form-item'
import { FormBaseItem } from '../form-item'
import useStyle from './style'

export type EditableProps = FormItemProps

const useInitialPattern = (fieldRef: Ref<Field>) => {
  const field = fieldRef.value
  return computed(() => field?.pattern)
}

const useFormItemProps = (fieldRef: Ref<Field>): FormItemProps => {
  const field = fieldRef.value
  if (isVoidField(field)) return {}
  if (!field) return {}
  const takeMessage = () => {
    if (field.selfErrors.length) return field.selfErrors
    if (field.selfWarnings.length) return field.selfWarnings
    if (field.selfSuccesses.length) return field.selfSuccesses
  }

  return {
    feedbackStatus: field.validateStatus === 'validating' ? 'pending' : field.validateStatus,
    feedbackText: takeMessage(),
    extra: field.description
  }
}

const EditableInner = observer(
  defineComponent<EditableProps>({
    name: 'Editable',
    setup(props, { attrs, slots }) {
      const fieldRef = useField<Field>()
      const pattern = useInitialPattern(fieldRef)
      const prefixCls = usePrefixCls('formily-editable', attrs.prefixCls as string)
      const innerRef = ref<HTMLElement>()
      const [wrapSSR, hashId] = useStyle(prefixCls)
      const setEditable = (payload: boolean) => {
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
          fireImmediately: true
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
          const target = e.target as HTMLElement
          const close = innerRef.value.querySelector(`.${prefixCls}-close-btn`)

          if (target?.contains(close) || close?.contains(target)) {
            closeEditable()
          } else if (!editable) {
            nextTick(() => {
              setEditable(true)
              nextTick(() => {
                innerRef.value.querySelector('input')?.focus()
              })
            })
          }
        }

        const renderEditHelper = () => {
          if (editable) return
          return (
            <FormBaseItem {...attrs} {...itemProps}>
              {pattern.value === 'editable' ? (
                <EditOutlined class={`${prefixCls}-edit-btn`} />
              ) : null}
            </FormBaseItem>
          )
        }

        const renderCloseHelper = () => {
          if (!editable) return
          return (
            <FormBaseItem {...attrs}>
              <CloseCircleOutlined class={`${prefixCls}-close-btn`} />
            </FormBaseItem>
          )
        }
        return wrapSSR(
          <div class={[prefixCls, hashId.value]} ref={innerRef} onClick={onClick}>
            <div class={`${prefixCls}-content`}>
              <FormBaseItem {...attrs} {...itemProps}>
                {slots.default?.()}
              </FormBaseItem>
              {renderEditHelper()}
              {renderCloseHelper()}
            </div>
          </div>
        )
      }
    }
  })
)

const EditablePopover = observer(
  defineComponent({
    name: 'EditablePopover',
    setup(props, { attrs, slots }) {
      const fieldRef = useField<Field>()
      const prefixCls = usePrefixCls('formily-editable', attrs.prefixCls as string)
      const [wrapSSR, hashId] = useStyle(prefixCls)
      const openRef = ref(false)

      return () => {
        const field = fieldRef.value
        const pattern = useInitialPattern(fieldRef)
        return wrapSSR(
          <Popover
            class={[prefixCls, hashId.value]}
            {...attrs}
            {...props}
            title={attrs.title || field.title}
            open={openRef.value}
            trigger="click"
            onOpenChange={(value: boolean) => {
              openRef.value = value
            }}
            content={slots.default()}
          >
            <FormBaseItem class={`${prefixCls}-trigger`}>
              <div class={`${prefixCls}-content`}>
                <span class={`${prefixCls}-preview`}>{attrs.title || field.title}</span>
                {pattern.value === 'editable' ? <EditOutlined /> : <MessageOutlined />}
              </div>
            </FormBaseItem>
          </Popover>
        )
      }
    }
  })
)

export const Editable = composeExport(EditableInner, {
  Popover: EditablePopover
})

export default Editable
