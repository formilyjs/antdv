<template>
  <Form :form="form" :label-col="4" :wrapper-col="10">
    <ArrayField
      name="upload"
      title="上传"
      :decorator="[FormItem]"
      :component="[NormalUpload]"
      required
    />
    <ArrayField
      name="upload2"
      title="卡片上传"
      :decorator="[FormItem]"
      :component="[CardUpload]"
      required
    />
    <ArrayField
      name="upload3"
      title="拖拽上传"
      :decorator="[FormItem]"
      :component="[DraggerUpload]"
      required
    />
    <FormButtonGroup align-form-item>
      <Submit @submit="onSubmit">提交</Submit>
    </FormButtonGroup>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { ArrayField } from '@formily/vue'
import { defineComponent } from 'vue-demi'
import { Form, FormItem, Upload, Submit, FormButtonGroup } from '@formily/antdv'
import { Button, Icon } from 'ant-design-vue'

const UploadButton = {
  functional: true,
  render(h) {
    return <Button>上传图片</Button>
  },
}

const NormalUpload = defineComponent({
  name: 'NormalUpload',
  render(h) {
    const props = this.$attrs
    return (
      <Upload
        {...props}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        headers={{
          authorization: 'authorization-text',
        }}
      >
        <Button>
          <Icon type="upload" />
          上传文件{' '}
        </Button>
      </Upload>
    )
  },
})

const CardUpload = defineComponent({
  name: 'CardUpload',
  render(h) {
    const props = this.$attrs

    return (
      <Upload
        {...props}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        headers={{
          authorization: 'authorization-text',
        }}
      >
        <Icon type="upload" style={{ fontSize: 20 }} />
      </Upload>
    )
  },
})

const DraggerUpload = defineComponent({
  name: 'DraggerUpload',
  render(h) {
    const props = this.$attrs

    return (
      <Upload.Dragger
        {...props}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      >
        <p class="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p class="ant-upload-text">Click or drag file to this area to upload</p>
        <p class="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Upload.Dragger>
    )
  },
})

const form = createForm()

export default {
  components: { UploadButton, Form, ArrayField, Submit, FormButtonGroup },
  data() {
    return {
      NormalUpload,
      CardUpload,
      DraggerUpload,
      FormItem,
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
