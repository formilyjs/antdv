import { Reset } from '../reset'
import { render } from '@testing-library/vue'
import { defineComponent } from '@vue/composition-api'
import { FormProvider, Field } from '@formily/vue'
import { createForm } from '@formily/core'

test('render Reset', () => {
  const form = createForm()
  render(
    defineComponent({
      name: 'TestReset',
      components: {
        FormProvider,
        Field,
      },
      setup() {
        return {
          form,
          Reset,
        }
      },
      template: `
        <FormProvider :form="form">
          <Field 
            name="aa"
            :component="[Reset]"
            content="重置"
          />
        </FormProvider>
      `,
    })
  )
  expect(form.mounted).toBeTruthy()
  expect(form.query('aa').take().mounted).toBeTruthy()
})
