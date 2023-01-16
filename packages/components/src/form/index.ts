import { defineComponent } from 'vue-demi'
import { FormProvider as _FormProvider, h, useForm } from '@formily/vue'
import { FormLayout } from '../form-layout'
import { PreviewText } from '../preview-text'

import type { Component, VNode } from 'vue'
import type { Form as FormType, IFormFeedback } from '@formily/core'
import type { FormLayoutProps } from '../form-layout'

const FormProvider = _FormProvider as unknown as Component

export interface FormProps extends FormLayoutProps {
  form?: FormType
  component?: Component | string
  previewTextPlaceholder: string | (() => VNode)
  onAutoSubmit?: (values: any) => any
  onAutoSubmitFailed?: (feedbacks: IFormFeedback[]) => void
}

export const Form = defineComponent({
  name: 'FForm',
  props: [
    'form',
    'component',
    'previewTextPlaceholder',
    'onAutoSubmit',
    'onAutoSubmitFailed',
  ],
  setup(props: FormProps, { attrs, slots, listeners }) {
    const top = useForm()

    return () => {
      const {
        form,
        component = 'form',
        onAutoSubmit = listeners?.autoSubmit,
        onAutoSubmitFailed = listeners?.autoSubmitFailed,
        previewTextPlaceholder = slots?.previewTextPlaceholder,
      } = props

      const renderContent = (form: FormType) => {
        return h(
          PreviewText.Placeholder,
          {
            props: {
              value: previewTextPlaceholder,
            },
          },
          {
            default: () => [
              h(
                FormLayout,
                {
                  attrs: {
                    ...attrs,
                  },
                },
                {
                  default: () => [
                    h(
                      component,
                      {
                        on: {
                          submit: (e: Event) => {
                            e?.stopPropagation?.()
                            e?.preventDefault?.()
                            form
                              .submit(onAutoSubmit as (e: any) => void)
                              .catch(onAutoSubmitFailed as (e: any) => void)
                          },
                        },
                      },
                      slots
                    ),
                  ],
                }
              ),
            ],
          }
        )
      }

      if (form) {
        return h(
          FormProvider,
          { props: { form } },
          {
            default: () => renderContent(form),
          }
        )
      }

      if (!top.value) throw new Error('must pass form instance by createForm')

      return renderContent(top.value)
    }
  },
})

export default Form
