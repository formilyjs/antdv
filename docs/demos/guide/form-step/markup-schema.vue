<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField x-component="FormStep" :x-component-props="{ formStep }">
        <SchemaVoidField x-component="FormStep.StepPane" :x-component-props="{ title: '第一步' }">
          <SchemaStringField
            name="aaa"
            title="AAA"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaVoidField>
        <SchemaVoidField x-component="FormStep.StepPane" :x-component-props="{ title: '第二步' }">
          <SchemaStringField
            name="bbb"
            title="AAA"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaVoidField>
        <SchemaVoidField
          type="void"
          x-component="FormStep.StepPane"
          :x-component-props="{ title: '第三步' }"
        >
          <SchemaStringField
            name="ccc"
            title="AAA"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaVoidField>
      </SchemaVoidField>
    </SchemaField>
    <FormConsumer>
      <template #default>
        <FormButtonGroup>
          <Button
            :disabled="!formStep.allowBack"
            @click="
              () => {
                formStep.back()
              }
            "
          >
            上一步
          </Button>
          <Button
            :disabled="!formStep.allowNext"
            @click="
              () => {
                formStep.next()
              }
            "
          >
            下一步
          </Button>
          <Submit :disabled="formStep.allowNext" @submit="log">提交</Submit>
        </FormButtonGroup>
      </template>
    </FormConsumer>
  </FormProvider>
</template>

<script setup lang="ts">
/* eslint-disable vue/no-reserved-component-names */
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, createSchemaField } from '@formily/vue'
import { FormItem, FormStep, FormButtonGroup, Submit, Input } from '@formily/antdv'
import { Button } from 'ant-design-vue'

const { SchemaField, SchemaVoidField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    FormStep,
    Input
  }
})

const form = createForm()
const formStep = FormStep.createFormStep()

const log = () => {
  formStep.submit(console.log)
}
</script>

<style lang="scss" scoped></style>
