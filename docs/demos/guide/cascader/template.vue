<template>
  <Form :form="form">
    <Field
      name="address"
      title="地址选择"
      required
      :decorator="[FormItem]"
      :component="[
        Cascader,
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
import { Form, FormItem, Cascader, Submit } from '@formily/antdv'
import { action } from '@formily/reactive'
import axios from 'axios'

const transformAddress = (data: Record<string, any> = {}) => {
  return Object.entries(data).reduce((buf, [key, value]) => {
    if (typeof value === 'string')
      return buf.concat({
        label: value,
        value: key
      })
    const { name, code, cities, districts } = value
    const _cities = transformAddress(cities)
    const _districts = transformAddress(districts)
    return buf.concat({
      label: name,
      value: code,
      children: _cities.length ? _cities : _districts.length ? _districts : undefined
    })
  }, [])
}

const useAddress = (pattern) => {
  onFieldReact(pattern, (field: InternalField) => {
    field.loading = true
    axios('https://unpkg.com/china-location/dist/location.json')
      .then((res) => res.data)
      .then(
        action.bound((data) => {
          field.dataSource = transformAddress(data)
          field.loading = false
        })
      )
  })
}

const form = createForm({
  effects: () => {
    useAddress('address')
  }
})

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, Field, Submit },
  data() {
    return {
      FormItem,
      Cascader,
      form
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    }
  }
}
</script>
