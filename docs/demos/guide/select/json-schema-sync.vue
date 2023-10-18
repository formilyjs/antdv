<template>
  <Form :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, Select, Submit, Reset } from '@formily/antdv'

const schema = {
  type: 'object',
  properties: {
    select: {
      type: 'string',
      title: '选择框',
      enum: [
        {
          label: '选项1',
          value: 1
        },
        {
          label: '选项2',
          value: 2
        }
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: 'width: 240px;'
      }
    }
  }
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Select
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
