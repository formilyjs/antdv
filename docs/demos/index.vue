<template>
  <FormProvider :form="formInstance">
    <Space>
      <Field
        name="price"
        title="价格"
        :initial-value="5.2"
        :decorator="[FormItem]"
        :component="[
          InputNumber,
          {
            placeholder: '请输入',
            style: {
              width: 100
            }
          }
        ]"
      />
      <FormItem>×</FormItem>
      <Field
        name="count"
        title="数量"
        :initial-value="100"
        :decorator="[FormItem]"
        :component="[
          InputNumber,
          {
            placeholder: '请输入',
            style: {
              width: 100
            }
          }
        ]"
      />
      <FormConsumer>
        <template #default="{ form }">
          <FormItem> = {{ `${form.values.price * form.values.count} 元` }}</FormItem>
        </template>
      </FormConsumer>
    </Space>
  </FormProvider>
</template>

<script lang="ts">
import { createForm } from '@formily/core'
import { InputNumber, FormItem, Space } from '@formily/antdv'
import { FormProvider, FormConsumer, Field } from '@formily/vue'

const formInstance = createForm()

export default {
  components: { FormProvider, FormConsumer, Field, FormItem, Space },
  data() {
    return {
      formInstance,
      InputNumber,
      FormItem
    }
  }
}
</script>
