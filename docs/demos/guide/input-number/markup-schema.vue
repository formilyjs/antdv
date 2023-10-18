<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="input"
        title="输入框"
        x-decorator="FormItem"
        x-component="InputNumber"
        :x-component-props="{
          style: {
            width: '240px'
          }
        }"
      />
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { FormItem, InputNumber, Submit } from '@formily/antdv'

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    InputNumber
  }
})

export default {
  components: { FormProvider, ...fields, Submit },
  data() {
    return {
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
