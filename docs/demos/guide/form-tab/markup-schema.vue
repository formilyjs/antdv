<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField type="void" x-component="FormTab" :x-component-props="{ formTab }">
        <SchemaVoidField
          type="void"
          name="tab1"
          x-component="FormTab.TabPane"
          :x-component-props="{ tab: 'A1' }"
        >
          <SchemaStringField
            name="aaa"
            x-decorator="FormItem"
            title="AAA"
            required
            x-component="Input"
          />
        </SchemaVoidField>
        <SchemaVoidField
          name="tab2"
          x-component="FormTab.TabPane"
          :x-component-props="{ tab: 'A2' }"
        >
          <SchemaStringField
            name="bbb"
            x-decorator="FormItem"
            title="BBB"
            required
            x-component="Input"
          />
        </SchemaVoidField>
        <SchemaVoidField
          name="tab3"
          x-component="FormTab.TabPane"
          :x-component-props="{ tab: 'A3' }"
        >
          <SchemaStringField
            name="ccc"
            x-decorator="FormItem"
            title="CCC"
            required
            x-component="Input"
          />
        </SchemaVoidField>
      </SchemaVoidField>
    </SchemaField>
    <FormButtonGroup align-form-item>
      <Button
        @click="
          () => {
            form.query('tab3').take((field) => {
              field.visible = !field.visible
            })
          }
        "
      >
        显示/隐藏最后一个Tab
      </Button>
      <Button
        @click="
          () => {
            formTab.setActiveKey('tab2')
          }
        "
      >
        切换第二个Tab
      </Button>
      <Submit @submit="log">提交</Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import { FormItem, FormTab, FormButtonGroup, Submit, Input } from '@formily/antdv'
import { Button } from 'ant-design-vue'

const { SchemaField, SchemaVoidField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    FormTab,
    Input
  }
})

const form = createForm()
const formTab = FormTab.createFormTab()

const log = (values) => {
  console.log(values)
}
</script>

<style lang="scss" scoped></style>
