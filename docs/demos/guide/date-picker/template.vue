<template>
  <Form :form="form">
    <Field
      name="date"
      title="普通日期"
      :decorator="[FormItem]"
      :component="[DatePicker]"
    />
    <Field
      name="week"
      title="周选择"
      :decorator="[FormItem]"
      :component="[DatePicker.WeekPicker]"
    />
    <Field
      name="month"
      title="月选择"
      :decorator="[FormItem]"
      :component="[DatePicker.MonthPicker]"
    />
    <Field
      name="year"
      title="年选择"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          mode: 'year',
        },
      ]"
    />
    <Field
      name="dateTime"
      title="日期时间"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          mode: 'time',
        },
      ]"
    />
    <ArrayField
      name="[startDate,endDate]"
      title="多个日期"
      :decorator="[FormItem]"
      :component="[
        DatePicker.RangePicker,
        {
          showTime: true,
        },
      ]"
    />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { Field, ArrayField } from '@formily/vue'
import { Form, FormItem, DatePicker, Submit } from '@formily/antdv'

const form = createForm()

export default {
  components: { Form, Field, ArrayField, Submit },
  data() {
    return {
      FormItem,
      DatePicker,
      form,
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    },
  },
}
</script>
l
