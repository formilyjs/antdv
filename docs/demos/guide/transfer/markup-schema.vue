<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="input"
        title="单选"
        x-decorator="FormItem"
        x-component="Transfer"
        :x-component-props="{
          render: (item) => item.title,
        }"
        :enum="[
          {
            title: '选项1',
            key: 1,
          },
          {
            title: '选项2',
            key: 2,
          },
        ]"
      />
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { FormItem, Transfer, Submit } from '@formily/antdv'

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    Transfer,
  },
})

export default {
  components: { FormProvider, ...fields, Submit },
  data() {
    return {
      form,
    }
  },
  methods: {
    log(value) {
      console.log(value)
    },
  },
}
</script>
