<template>
  <Form :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, Password, Submit } from '@formily/antdv'

const schema = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      title: '密码框',
      'x-decorator': 'FormItem',
      'x-component': 'Password'
    }
  }
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Password
  }
})

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, SchemaField, Submit },
  data() {
    return {
      form,
      schema
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    }
  }
}
</script>
