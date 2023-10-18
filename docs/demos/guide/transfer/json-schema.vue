<template>
  <Form :form="form" label-align="left" :label-width="160">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, Transfer, Submit } from '@formily/antdv'

const schema = {
  type: 'object',
  properties: {
    transfer: {
      type: 'array',
      title: '穿梭框',
      enum: [
        { title: '选项1', key: '1' },
        { title: '选项2', key: '2' }
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Transfer',
      'x-component-props': {
        render: (item) => item.title
      }
    }
  }
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Transfer
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
