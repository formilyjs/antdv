import { h, useParentForm } from '@formily/vue'
import type { IFormFeedback } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { defineComponent } from '@vue/composition-api'

import { Button as AntButton } from 'ant-design-vue'
import type { Button as ButtonProps } from 'ant-design-vue/types/button/button'

export interface ISubmitProps extends ButtonProps {
  onClick?: (e: MouseEvent) => any
  onSubmit?: (values: any) => any
  onSubmitSuccess?: (payload: any) => void
  onSubmitFailed?: (feedbacks: IFormFeedback[]) => void
}

export const Submit = observer(
  defineComponent<ISubmitProps>({
    name: 'FSubmit',
    props: ['onClick', 'onSubmit', 'onSubmitSuccess', 'onSubmitFailed'],
    setup(props, { attrs, slots, listeners }) {
      const formRef = useParentForm()

      return () => {
        const {
          onClick = listeners?.click,
          onSubmit = listeners?.submit,
          onSubmitSuccess = listeners?.submitSuccess,
          onSubmitFailed = listeners?.submitFailed,
        } = props

        const form = formRef?.value
        return h(
          AntButton,
          {
            attrs: {
              nativeType: listeners?.submit ? 'button' : 'submit',
              type: 'primary',
              ...attrs,
              loading:
                attrs.loading !== undefined ? attrs.loading : form?.submitting,
            },
            on: {
              ...listeners,
              click: (e: any) => {
                if (onClick) {
                  if (onClick(e) === false) return
                }
                if (onSubmit) {
                  form
                    ?.submit(onSubmit as (e: any) => void)
                    .then(onSubmitSuccess as (e: any) => void)
                    .catch(onSubmitFailed as (e: any) => void)
                }
              },
            },
          },
          slots
        )
      }
    },
  })
)

export default Submit
