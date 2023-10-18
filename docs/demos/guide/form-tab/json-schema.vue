<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" :scope="{ formTab }" />
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

<script lang="ts">
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import { FormItem, FormTab, FormButtonGroup, Submit, Input } from '@formily/antdv'
import { Button } from 'ant-design-vue'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    FormTab,
    Input
  }
})

const schema = {
  type: 'object',
  properties: {
    collapse: {
      type: 'void',
      'x-component': 'FormTab',
      'x-component-props': {
        formTab: '{{formTab}}'
      },
      properties: {
        tab1: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: 'A1'
          },
          properties: {
            aaa: {
              type: 'string',
              title: 'AAA',
              'x-decorator': 'FormItem',
              required: true,
              'x-component': 'Input'
            }
          }
        },
        tab2: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: 'A2'
          },
          properties: {
            bbb: {
              type: 'string',
              title: 'BBB',
              'x-decorator': 'FormItem',
              required: true,
              'x-component': 'Input'
            }
          }
        },
        tab3: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: 'A3'
          },
          properties: {
            ccc: {
              type: 'string',
              title: 'CCC',
              'x-decorator': 'FormItem',
              required: true,
              'x-component': 'Input'
            }
          }
        }
      }
    }
  }
}

export default {
  components: {
    FormProvider,
    FormButtonGroup,
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
    Submit,
    SchemaField
  },

  data() {
    const form = createForm()
    const formTab = FormTab.createFormTab()

    return {
      schema,
      form,
      formTab
    }
  },
  methods: {
    log(values) {
      console.log(values)
    }
  }
}
</script>

<style lang="scss" scoped></style>
