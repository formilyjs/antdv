import type { Form as FormType, IFormFeedback } from '@formily/core'
import { FormProvider, useForm } from '@formily/vue'
import type { Component, PropType, VNode } from 'vue'
import { defineComponent } from 'vue'
import type { PropTypes } from '../__builtins__'
import { FormLayout, getFormLayoutProps } from '../form-layout'
import { PreviewText } from '../preview-text'

export const getFormProps = () => {
  return {
    ...getFormLayoutProps(),
    form: {
      type: Object as PropType<FormType>
    },
    component: {
      type: [String, Object] as PropType<Component | string>
    },
    previewTextPlaceholder: {
      type: [String, Function] as PropType<string | (() => VNode)>
    },
    onAutoSubmit: {
      type: Function as PropType<(values: any) => any>
    },
    onAutoSubmitFailed: {
      type: Function as PropType<(feedbacks: IFormFeedback[]) => void>
    }
  }
}

export type FormProps = PropTypes<typeof getFormProps>

export const Form = defineComponent({
  name: 'FForm',
  props: getFormProps(),
  setup(props, { attrs, slots }) {
    const top = useForm()

    return () => {
      const {
        form,
        component = 'form',
        onAutoSubmit = attrs.onAutoSubmit,
        onAutoSubmitFailed = attrs.onAutoSubmitFailed,
        previewTextPlaceholder = slots.previewTextPlaceholder,
        ...layoutProps
      } = props

      const renderContent = (form: FormType) => {
        const Com = component as 'form'
        return (
          <PreviewText.Placeholder value={previewTextPlaceholder}>
            <Com
              onSubmit={(e: Event) => {
                e?.stopPropagation?.()
                e?.preventDefault?.()
                form
                  .submit(onAutoSubmit as (e: any) => void)
                  .catch(onAutoSubmitFailed as (e: any) => void)
              }}
            >
              <FormLayout {...attrs} {...layoutProps}>
                {slots.default?.()}
              </FormLayout>
            </Com>
          </PreviewText.Placeholder>
        )
      }

      if (form) {
        return <FormProvider form={form}>{renderContent(form)}</FormProvider>
      }

      if (!top.value) throw new Error('must pass form instance by createForm')

      return renderContent(top.value)
    }
  }
})

export default Form
