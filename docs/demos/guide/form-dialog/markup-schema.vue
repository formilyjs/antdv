<template>
  <FormDialogPortal :id="portalId">
    <Button @click="handleOpen">点击打开表单</Button>
  </FormDialogPortal>
</template>

<script lang="tsx">
/* eslint-disable vue/one-component-per-file */
import { FormDialog, FormLayout, FormItem, Input } from '@formily/antdv'
import { Button } from 'ant-design-vue'
import { createSchemaField } from '@formily/vue'
import { defineComponent } from 'vue'

const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Input
  }
})

// 弹框表单组件
const DialogForm = defineComponent({
  inject: ['foo'],
  props: ['form'],

  render() {
    console.log(this)
    const form = this.$props.form.form
    console.log(this.foo)
    return (
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField>
          <SchemaStringField
            name="aaa"
            required
            title="输入框1"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaStringField
            name="bbb"
            required
            title="输入框2"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaStringField
            name="ccc"
            required
            title="输入框3"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaStringField
            name="ddd"
            required
            title="输入框4"
            x-decorator="FormItem"
            x-component="Input"
          />
        </SchemaField>
        <FormDialog.Footer>
          <span style={{ marginLeft: '4px' }}>扩展文案: {form.values.aaa}</span>
        </FormDialog.Footer>
      </FormLayout>
    )
  }
})

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Button, FormDialogPortal: FormDialog.Portal },
  provide: {
    foo: '自定义上下文可以直接传到弹窗内部，只需要ID一致即可'
  },
  data() {
    return {
      portalId: '可以传，也可以不传的ID，默认是form-dialog'
    }
  },
  methods: {
    handleOpen() {
      FormDialog('弹框表单', this.portalId, (form) => <DialogForm form={form} />)
        .forOpen((payload, next) => {
          setTimeout(() => {
            next({
              initialValues: {
                aaa: '123'
              }
            })
          }, 1000)
        })
        .forConfirm((payload, next) => {
          setTimeout(() => {
            console.log(payload)
            next(payload)
          }, 1000)
        })
        .forCancel((payload, next) => {
          setTimeout(() => {
            console.log(payload)
            next(payload)
          }, 1000)
        })
        .open()
        .then(console.log)
        .catch(console.error)
    }
  }
}
</script>
