import { observer } from '@formily/reactive-vue'
import { useParentForm } from '@formily/vue'
import type { ButtonProps } from 'ant-design-vue'
import { Button } from 'ant-design-vue'
import { defineComponent } from 'vue'

import type { IFormFeedback } from '@formily/core'

export interface ISubmitProps extends ButtonProps {
  onClick?: (e: MouseEvent) => any
  onSubmit?: (values: any) => any
  onSubmitSuccess?: (payload: any) => void
  onSubmitFailed?: (feedbacks: IFormFeedback[]) => void
}

export const Submit = observer(
  defineComponent({
    name: 'FSubmit',
    setup(props, { attrs, slots }) {
      const formRef = useParentForm()

      return () => {
        const { onClick, onSubmit, onSubmitSuccess, onSubmitFailed } = attrs
        const form = formRef?.value
        return (
          <Button
            type="primary"
            {...attrs}
            loading={attrs.loading !== undefined ? attrs.loading : form?.submitting}
            onClick={async (e) => {
              const result = await (onClick as Function)?.(e)
              if (result === false) return
              if (onSubmit) {
                form
                  ?.submit(onSubmit as (e: any) => void)
                  .then(onSubmitSuccess as (e: any) => void)
                  .catch(onSubmitFailed as (e: any) => void)
              }
            }}
          >
            {slots.default?.()}
          </Button>
        )
      }
    }
  })
)

export default Submit
