<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script lang="ts">
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import { FormItem, Submit, Input, ArrayCards } from '@formily/antdv'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCards
  }
})

export default {
  components: {
    FormProvider,
    Submit,
    ...SchemaField
  },

  data() {
    const form = createForm()
    const schema = {
      type: 'object',
      properties: {
        array: {
          type: 'array',
          'x-component': 'ArrayCards',
          'x-decorator': 'FormItem',
          maxItems: 3,
          'x-component-props': {
            title: '对象数组'
          },
          items: {
            type: 'object',
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayCards.Index'
              },
              aa: {
                type: 'string',
                'x-decorator': 'FormItem',
                title: 'AA',
                required: true,
                'x-component': 'Input',
                description: '输入123'
              },
              bb: {
                type: 'string',
                title: 'BB',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-reactions': [
                  {
                    dependencies: ['.aa'],
                    when: "{{$deps[0] != '123'}}",
                    fulfill: {
                      schema: {
                        title: 'BB',
                        'x-disabled': true
                      }
                    },
                    otherwise: {
                      schema: {
                        title: 'Changed',
                        'x-disabled': false
                      }
                    }
                  }
                ]
              },
              remove: {
                type: 'void',
                'x-component': 'ArrayCards.Remove'
              },
              moveUp: {
                type: 'void',
                'x-component': 'ArrayCards.MoveUp'
              },
              moveDown: {
                type: 'void',
                'x-component': 'ArrayCards.MoveDown'
              }
            }
          },
          properties: {
            addition: {
              type: 'void',
              title: '添加条目',
              'x-component': 'ArrayCards.Addition'
            }
          }
        }
      }
    }

    return {
      form,
      schema
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
