<template>
  <FormProvider :form="form">
    <FormLayout :label-col="6" :wrapper-col="16">
      <VoidField
        name="name"
        title="姓名"
        :decorator="[
          FormItem,
          {
            asterisk: true,
            feedbackLayout: 'none'
          }
        ]"
        :component="[Space]"
      >
        <Field name="firstName" :decorator="[FormItem]" :component="[Input]" required />
        <Field name="lastName" :decorator="[FormItem]" :component="[Input]" required />
      </VoidField>
      <VoidField
        name="texts"
        title="文本串联"
        :decorator="[
          FormItem,
          {
            asterisk: true,
            feedbackLayout: 'none'
          }
        ]"
        :component="[Space]"
      >
        <Field
          name="aa"
          :decorator="[
            FormItem,
            {
              addonAfter: '单位'
            }
          ]"
          :component="[Input]"
          required
        />
        <Field
          name="bb"
          :decorator="[
            FormItem,
            {
              addonAfter: '单位'
            }
          ]"
          :component="[Input]"
          required
        />
        <Field
          name="cc"
          :decorator="[
            FormItem,
            {
              addonAfter: '单位'
            }
          ]"
          :component="[Input]"
          required
        />
      </VoidField>
      <Field
        name="textarea"
        title="文本框"
        :decorator="[FormItem]"
        :component="[
          Input.TextArea,
          {
            style: {
              width: 400
            }
          }
        ]"
        required
      />
      <FormButtonGroup align-form-item>
        <Submit :on-submit="log">提交</Submit>
      </FormButtonGroup>
    </FormLayout>
  </FormProvider>
</template>

<script lang="ts">
import { createForm } from '@formily/core'
import { FormProvider, Field, VoidField } from '@formily/vue'
import { FormLayout, FormItem, Input, Submit, Space, FormButtonGroup } from '@formily/antdv'

const form = createForm()

export default {
  components: {
    FormProvider,
    FormLayout,
    FormButtonGroup,
    VoidField,
    Field,
    Submit
  },
  data() {
    return {
      FormItem,
      Input,
      Space,
      form
    }
  },
  methods: {
    log(value) {
      console.log(value)
    }
  }
}
</script>
