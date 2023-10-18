<template>
  <Form :form="form">
    <Field
      name="linkage"
      title="联动选择框"
      :decorator="[FormItem]"
      :component="[
        Select,
        {
          style: {
            width: '240px'
          }
        }
      ]"
      :data-source="[
        { label: '发请求1', value: 1 },
        { label: '发请求2', value: 2 }
      ]"
    />
    <Field
      name="select"
      title="异步选择框"
      :decorator="[FormItem]"
      :component="[
        Select,
        {
          style: {
            width: '240px'
          }
        }
      ]"
    />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script lang="ts">
import type { Field as InternalField } from '@formily/core'
import { createForm, onFieldReact } from '@formily/core'
import { Field } from '@formily/vue'
import { action } from '@formily/reactive'
import { Form, FormItem, Select, Submit, Reset } from '@formily/antdv'

const useAsyncDataSource = (pattern, service) => {
  onFieldReact(pattern, (field: InternalField) => {
    field.loading = true
    service(field).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
      })
    )
  })
}

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
                value: 'aaa'
              },
              {
                label: 'BBB',
                value: 'ccc'
              }
            ])
          } else if (linkage === 2) {
            resolve([
              {
                label: 'CCC',
                value: 'ccc'
              },
              {
                label: 'DDD',
                value: 'ddd'
              }
            ])
          }
        }, 1500)
      })
    })
  }
})

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, Field, Submit },
  data() {
    return {
      form,
      FormItem,
      Select
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    }
  }
}
</script>
