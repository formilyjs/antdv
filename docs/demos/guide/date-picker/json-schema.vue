<template>
  <Form :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, DatePicker, Submit } from '@formily/antdv'

const schema = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      title: '普通日期',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker'
    },
    week: {
      type: 'string',
      title: '周选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.WeekPicker'
    },
    month: {
      type: 'string',
      title: '月选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.MonthPicker'
    },
    year: {
      type: 'string',
      title: '年选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'year'
      }
    },
    dateTime: {
      type: 'string',
      title: '日期时间',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        showTime: true
      }
    },
    '[startDate,endDate]': {
      title: '日期范围',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        showTime: true
      },
      type: 'string'
    }
  }
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    DatePicker
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
