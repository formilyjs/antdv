<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaNumberField
        name="linkage"
        title="联动选择框"
        x-decorator="FormItem"
        x-component="Select"
        :enum="[
          { label: '发请求1', value: 1 },
          { label: '发请求2', value: 2 }
        ]"
        :x-component-props="{
          style: {
            width: '200px'
          }
        }"
      />
      <SchemaStringField
        name="select"
        title="异步选择框"
        x-decorator="FormItem"
        x-component="TreeSelect"
        :x-component-props="{
          style: {
            width: '200px'
          }
        }"
      />
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>
<script lang="ts">
import type { Field } from '@formily/core'
import { createForm, onFieldReact } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { FormItem, TreeSelect, Submit, Select } from '@formily/antdv'
import { action } from '@formily/reactive'

const useAsyncDataSource = (pattern, service) => {
  onFieldReact(pattern, (field: Field) => {
    field.loading = true
    service(field).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
      })
    )
  })
}

const fields = createSchemaField({
  components: {
    FormItem,
    TreeSelect,
    Select
  }
})

export default {
  components: { FormProvider, ...fields, Submit },
  data() {
    const form = createForm({
      effects: () => {
        useAsyncDataSource('select', async (field) => {
          const linkage = field.query('linkage').get('value')
          if (!linkage) return []
          return new Promise((resolve) => {
            setTimeout(() => {
              if (linkage === 1) {
                resolve([
                  {
                    label: 'AAA',
                    value: 'aaa',
                    children: [
                      {
                        title: 'Child Node1',
                        value: '0-0-0',
                        key: '0-0-0'
                      },
                      {
                        title: 'Child Node2',
                        value: '0-0-1',
                        key: '0-0-1'
                      },
                      {
                        title: 'Child Node3',
                        value: '0-0-2',
                        key: '0-0-2'
                      }
                    ]
                  },
                  {
                    label: 'BBB',
                    value: 'ccc',
                    children: [
                      {
                        title: 'Child Node1',
                        value: '0-1-0',
                        key: '0-1-0'
                      },
                      {
                        title: 'Child Node2',
                        value: '0-1-1',
                        key: '0-1-1'
                      },
                      {
                        title: 'Child Node3',
                        value: '0-1-2',
                        key: '0-1-2'
                      }
                    ]
                  }
                ])
              } else if (linkage === 2) {
                resolve([
                  {
                    label: 'CCC',
                    value: 'ccc',
                    children: [
                      {
                        title: 'Child Node1',
                        value: '0-0-0',
                        key: '0-0-0'
                      },
                      {
                        title: 'Child Node2',
                        value: '0-0-1',
                        key: '0-0-1'
                      },
                      {
                        title: 'Child Node3',
                        value: '0-0-2',
                        key: '0-0-2'
                      }
                    ]
                  },
                  {
                    label: 'DDD',
                    value: 'ddd',
                    children: [
                      {
                        title: 'Child Node1',
                        value: '0-1-0',
                        key: '0-1-0'
                      },
                      {
                        title: 'Child Node2',
                        value: '0-1-1',
                        key: '0-1-1'
                      },
                      {
                        title: 'Child Node3',
                        value: '0-1-2',
                        key: '0-1-2'
                      }
                    ]
                  }
                ])
              }
            }, 1500)
          })
        })
      }
    })

    return {
      form
    }
  },
  methods: {
    log(value) {
      console.log(value)
    }
  }
}
</script>
