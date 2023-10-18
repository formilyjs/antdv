<template>
  <Form :form="form">
    <Field name="single" title="是否确认" :decorator="[FormItem]" :component="[Checkbox]" />
    <ArrayField
      name="multiple"
      title="复选"
      :data-source="[
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 }
      ]"
      :decorator="[FormItem]"
      :component="[Checkbox.Group]"
    >
      <template #option="{ option }">
        <div>{{ option.label }}</div>
      </template>
    </ArrayField>
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script lang="ts">
import { createForm } from '@formily/core'
import { Field, ArrayField } from '@formily/vue'
import { Form, FormItem, Checkbox, Submit } from '@formily/antdv'

const form = createForm()

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, Field, ArrayField, Submit },
  data() {
    return {
      FormItem,
      Checkbox,
      form
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    }
  }
}
</script>
